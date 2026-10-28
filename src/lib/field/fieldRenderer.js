// Draws one frame of the hero field onto a 2D canvas context. Reads the scene; never changes it.

import { LAYER_KEYS } from './fieldModel';

/** Squared distance (px²) under which two particles of the same hub are linked. */
const LINK_DIST_SQ = 2600;
const LINK_ALPHA = 0.45;
const PARTICLE_ALPHA = 0.9;
const TRACE_ALPHA = 0.45;
/** How strongly non-focused layers fade while one layer is highlighted. */
const DIM_LINKS = 0.25;
const DIM_PARTICLES = 0.3;
const DIM_HUBS = 0.4;
const TRAIL_LENGTH = 7;
const TRAIL_SPACING = 0.025;
const HUB_LABEL_FONT = '500 11px "IBM Plex Mono", monospace';
const FULL_CIRCLE = Math.PI * 2;

/**
 * @typedef {{fe: string, be: string, ai: string, fg: string, mute: string}} FieldColors
 * @typedef {{width: number, height: number, hubs: object[], particles: object[], packets: object[]}} FieldScene
 */

/**
 * Turns a CSS colour into a translucent version of itself.
 * @param {string} color - Any CSS colour.
 * @param {number} alpha - Opacity from 0 to 1.
 * @returns {string} A `color-mix()` expression.
 */
const fade = (color, alpha) => `color-mix(in srgb, ${color} ${Math.round(alpha * 100)}%, transparent)`;

/**
 * Opacity multiplier for something that belongs to a hub, given the highlighted hub.
 * @param {number} focus - Highlighted hub index, or -1 for none.
 * @param {number} hub - The hub the item belongs to.
 * @param {number} dimmed - Multiplier to use when another hub is highlighted.
 * @returns {number} The multiplier.
 */
const dimFactor = (focus, hub, dimmed) => (focus > -1 && focus !== hub ? dimmed : 1);

/**
 * Reads the layer colours from the page's CSS variables, so the canvas follows the theme.
 * @returns {FieldColors} Current colours.
 */
export function readFieldColors() {
    const styles = getComputedStyle(document.documentElement);
    const read = (name) => styles.getPropertyValue(`--${name}`).trim();
    return { fe: read('fe'), be: read('be'), ai: read('ai'), fg: read('fg'), mute: read('mute') };
}

/** Draws the dashed line that joins the three hubs. */
function drawTrace(ctx, hubs, colors) {
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 6]);
    ctx.strokeStyle = fade(colors.mute, TRACE_ALPHA);
    ctx.beginPath();
    ctx.moveTo(hubs[0].x, hubs[0].y);
    hubs.slice(1).forEach((hub) => ctx.lineTo(hub.x, hub.y));
    ctx.stroke();
    ctx.setLineDash([]);
}

/** Draws faint lines between nearby particles of the same hub. */
function drawLinks(ctx, particles, colors, focus) {
    ctx.lineWidth = 1;
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            if (a.hub !== b.hub) continue;
            const distSq = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
            if (distSq >= LINK_DIST_SQ) continue;
            const alpha = (1 - distSq / LINK_DIST_SQ) * LINK_ALPHA * dimFactor(focus, a.hub, DIM_LINKS);
            ctx.strokeStyle = fade(colors[LAYER_KEYS[a.hub]], alpha);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
        }
    }
}

/** Draws every particle as a small dot in its layer colour. */
function drawParticles(ctx, particles, colors, focus) {
    for (const p of particles) {
        ctx.fillStyle = fade(colors[LAYER_KEYS[p.hub]], PARTICLE_ALPHA * dimFactor(focus, p.hub, DIM_PARTICLES));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, FULL_CIRCLE);
        ctx.fill();
    }
}

/** Draws each hub: its pulsing ring, core dot and label. */
function drawHubs(ctx, hubs, colors, focus) {
    hubs.forEach((hub, i) => {
        const focused = focus === i;
        const dim = dimFactor(focus, i, DIM_HUBS);
        ctx.strokeStyle = fade(colors[hub.key], 0.5 * dim);
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, 14 + hub.pulse * 16 + (focused ? 5 : 0), 0, FULL_CIRCLE);
        ctx.stroke();
        ctx.fillStyle = fade(colors[hub.key], dim);
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, focused ? 8 : 6, 0, FULL_CIRCLE);
        ctx.fill();
        ctx.font = HUB_LABEL_FONT;
        ctx.fillStyle = fade(colors.fg, 0.85 * dim);
        ctx.textAlign = 'center';
        ctx.fillText(hub.label, hub.x, hub.y + (i === hubs.length - 1 ? -26 : 34));
    });
}

/** Draws travelling packets with a short fading trail. */
function drawPackets(ctx, packets, hubs, colors) {
    for (const packet of packets) {
        if (packet.progress < 0) continue;
        const from = hubs[packet.from];
        const to = hubs[packet.to];
        const at = (t) => [from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t];
        for (let m = 0; m < TRAIL_LENGTH; m++) {
            const [x, y] = at(Math.max(0, packet.progress - m * TRAIL_SPACING));
            ctx.fillStyle = fade(colors[to.key], (1 - m / TRAIL_LENGTH) * 0.7);
            ctx.beginPath();
            ctx.arc(x, y, 4 - m * 0.4, 0, FULL_CIRCLE);
            ctx.fill();
        }
        const [x, y] = at(packet.progress);
        ctx.fillStyle = colors.fg;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, FULL_CIRCLE);
        ctx.fill();
    }
}

/**
 * Clears the canvas and draws the whole scene.
 * @param {CanvasRenderingContext2D} ctx - Context to draw on (already scaled for device pixels).
 * @param {FieldScene} scene - Current hubs, particles and packets.
 * @param {FieldColors} colors - Colours from {@link readFieldColors}.
 * @param {number} focus - Highlighted hub index, or -1 for none.
 * @returns {void}
 */
export function renderField(ctx, scene, colors, focus) {
    ctx.clearRect(0, 0, scene.width, scene.height);
    drawTrace(ctx, scene.hubs, colors);
    drawLinks(ctx, scene.particles, colors, focus);
    drawParticles(ctx, scene.particles, colors, focus);
    drawHubs(ctx, scene.hubs, colors, focus);
    drawPackets(ctx, scene.packets, scene.hubs, colors);
}
