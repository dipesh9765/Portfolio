// Runs the hero field: sizes the canvas, drives the animation loop, handles pointer input
// and packet requests, and releases every listener, observer and frame on destroy().

import { createLayout, nearestHub, queuePackets, stepHubs, stepPackets, stepParticles } from './fieldModel';
import { readFieldColors, renderField } from './fieldRenderer';
import { onPackets } from '../fieldBus';

/** Highest device-pixel ratio rendered; more costs battery for no visible gain. */
const MAX_PIXEL_RATIO = 2;
/** Longest frame step in seconds, so a backgrounded tab does not jump on return. */
const MAX_FRAME_STEP = 0.05;
const DEFAULT_FRAME_STEP = 0.016;
/** Frames between ambient packets that keep the field alive when nobody interacts. */
const AMBIENT_EVERY_FRAMES = 150;
const AMBIENT_MAX_PACKETS = 3;
const OFFSCREEN = { x: -999, y: -999 };

/**
 * Owns one running hero field. Create it with {@link createFieldEngine}; call destroy() when done.
 */
class FieldEngine {
    #canvas;
    #container;
    #ctx;
    #reduceMotion;
    #scene = { width: 0, height: 0, hubs: [], particles: [], packets: [] };
    #colors = readFieldColors();
    #focus = -1;
    #pointer = OFFSCREEN;
    #visible = true;
    #frameId = 0;
    #frameCount = 0;
    #lastTime = 0;
    #resizeObserver;
    #visibilityObserver;
    #stopListening;

    /**
     * @param {HTMLCanvasElement} canvas - Canvas to draw on; it should fill `container`.
     * @param {HTMLElement} container - Element whose size the canvas follows and whose clicks send packets.
     * @param {boolean} reduceMotion - Draw still frames instead of animating.
     */
    constructor(canvas, container, reduceMotion) {
        this.#canvas = canvas;
        this.#container = container;
        this.#ctx = canvas.getContext('2d');
        this.#reduceMotion = reduceMotion;
        this.#resize();
        this.#subscribe();
        if (reduceMotion) this.#draw(); else this.#frameId = requestAnimationFrame(this.#tick);
    }

    /**
     * Highlights one hub and dims the others.
     * @param {number} hub - Hub index, or -1 to clear the highlight.
     * @returns {void}
     */
    setFocus(hub) {
        this.#focus = hub;
        if (this.#reduceMotion) this.#draw();
    }

    /**
     * Re-reads the layer colours from CSS, e.g. after the theme changes.
     * @returns {void}
     */
    refreshColors() {
        this.#colors = readFieldColors();
        if (this.#reduceMotion) this.#draw();
    }

    /**
     * Stops the animation and removes every listener and observer.
     * @returns {void}
     */
    destroy() {
        cancelAnimationFrame(this.#frameId);
        this.#resizeObserver.disconnect();
        this.#visibilityObserver.disconnect();
        window.removeEventListener('pointermove', this.#onPointerMove);
        this.#container.removeEventListener('pointerdown', this.#onPointerDown);
        this.#stopListening();
    }

    #subscribe() {
        this.#resizeObserver = new ResizeObserver(() => this.#resize());
        this.#resizeObserver.observe(this.#container);
        this.#visibilityObserver = new IntersectionObserver((entries) => { this.#visible = entries[0].isIntersecting; });
        this.#visibilityObserver.observe(this.#container);
        window.addEventListener('pointermove', this.#onPointerMove);
        this.#container.addEventListener('pointerdown', this.#onPointerDown);
        this.#stopListening = onPackets((path) => queuePackets(this.#scene.packets, path));
    }

    #draw() {
        renderField(this.#ctx, this.#scene, this.#colors, this.#focus);
    }

    #resize() {
        const rect = this.#canvas.getBoundingClientRect();
        const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
        this.#canvas.width = Math.round(rect.width * ratio);
        this.#canvas.height = Math.round(rect.height * ratio);
        this.#ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        Object.assign(this.#scene, { width: rect.width, height: rect.height }, createLayout(rect.width, rect.height));
        if (this.#reduceMotion) this.#draw();
    }

    #tick = (time) => {
        this.#frameId = requestAnimationFrame(this.#tick);
        const dt = Math.min((time - this.#lastTime) / 1000 || DEFAULT_FRAME_STEP, MAX_FRAME_STEP);
        this.#lastTime = time;
        if (!this.#visible) return;
        this.#frameCount++;
        this.#addAmbientPackets();
        const { particles, hubs, packets } = this.#scene;
        stepParticles(particles, hubs, this.#pointer, dt);
        stepHubs(hubs, dt);
        stepPackets(packets, hubs, dt);
        this.#draw();
    };

    #addAmbientPackets() {
        const { packets } = this.#scene;
        if (this.#frameCount % AMBIENT_EVERY_FRAMES !== 0 || packets.length >= AMBIENT_MAX_PACKETS) return;
        queuePackets(packets, [[0, 1], [1, 2]]);
    }

    #toCanvasPoint(e) {
        const rect = this.#canvas.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    #onPointerMove = (e) => {
        this.#pointer = this.#toCanvasPoint(e);
    };

    #onPointerDown = (e) => {
        if (e.target.closest('a, button')) return;
        const { x, y } = this.#toCanvasPoint(e);
        const { hubs, packets } = this.#scene;
        const hub = nearestHub(hubs, x, y);
        queuePackets(packets, [[hub, (hub + 1) % hubs.length]]);
    };
}

/**
 * Starts the hero field animation on a canvas.
 * @param {HTMLCanvasElement} canvas - Canvas to draw on; it should fill `container`.
 * @param {HTMLElement} container - Element whose size the canvas follows and whose clicks send packets.
 * @param {{reduceMotion: boolean}} options - With reduceMotion, still frames are drawn instead of animating.
 * @returns {FieldEngine} The running engine; call destroy() to stop it.
 */
export function createFieldEngine(canvas, container, { reduceMotion }) {
    return new FieldEngine(canvas, container, reduceMotion);
}
