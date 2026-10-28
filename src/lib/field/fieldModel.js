// Simulation state for the hero field: where the hubs sit, how particles orbit them
// and how packets travel between them. Pure data and maths; no DOM or canvas access.

/** Layer keys in hub order: 0 frontend, 1 backend, 2 AI. */
export const LAYER_KEYS = ['fe', 'be', 'ai'];

const HUB_LABELS = ['FRONTEND', 'BACKEND', 'AI'];
/** Hub positions as fractions of the area that holds them. */
const HUB_POSITIONS = [[0.28, 0.2], [0.78, 0.5], [0.34, 0.82]];
/** Canvas width above which the hubs sit beside the hero text instead of below it. */
const WIDE_LAYOUT_MIN = 820;
/** Height of the bottom band that holds the hubs on narrow screens. */
const NARROW_BAND_HEIGHT = 290;
const PARTICLES_WIDE = 84;
const PARTICLES_NARROW = 54;
const ORBIT_MIN = 26;
const ORBIT_SPREAD_WIDE = 70;
const ORBIT_SPREAD_NARROW = 46;
/** Vertical squash that turns circular orbits into ellipses. */
const ORBIT_ASPECT = 0.8;
const ORBIT_SPEED = 0.6;
const SPRING = 0.03;
const DAMPING = 0.86;
/** Squared distance (px²) within which the pointer pushes particles away. */
const REPEL_RADIUS_SQ = 14000;
const REPEL_FORCE = 2.4;
const PACKET_SPEED = 0.9;
/** Delay between consecutive hops of one packet path, in packet-progress units. */
const PACKET_STAGGER = 0.9;
const PULSE_DECAY = 1.2;

/**
 * @typedef {{x: number, y: number, key: string, label: string, pulse: number}} Hub
 * @typedef {{hub: number, angle: number, radius: number, speed: number, x: number, y: number, vx: number, vy: number, size: number}} Particle
 * @typedef {{from: number, to: number, progress: number}} Packet
 */

/**
 * Works out the rectangle the hubs are placed in.
 * @param {number} width - Canvas width in CSS pixels.
 * @param {number} height - Canvas height in CSS pixels.
 * @returns {{x: number, y: number, w: number, h: number, wide: boolean}} The hub area.
 */
function hubArea(width, height) {
    if (width > WIDE_LAYOUT_MIN) return { x: width * 0.52, y: 40, w: width * 0.44, h: height - 80, wide: true };
    return { x: 16, y: height - NARROW_BAND_HEIGHT, w: width - 32, h: NARROW_BAND_HEIGHT - 20, wide: false };
}

/**
 * Creates particles spread evenly across the hubs, each with its own orbit.
 * @param {Hub[]} hubs - The hubs to orbit.
 * @param {boolean} wide - Whether the wide layout is in use (more, wider-orbiting particles).
 * @returns {Particle[]} New particles.
 */
function createParticles(hubs, wide) {
    const count = wide ? PARTICLES_WIDE : PARTICLES_NARROW;
    const spread = wide ? ORBIT_SPREAD_WIDE : ORBIT_SPREAD_NARROW;
    return Array.from({ length: count }, (_, i) => {
        const hub = i % hubs.length;
        const angle = Math.random() * Math.PI * 2;
        const direction = Math.random() < 0.5 ? -1 : 1;
        return {
            hub, angle,
            radius: ORBIT_MIN + Math.random() * spread,
            speed: (Math.random() * 0.5 + 0.18) * direction,
            x: hubs[hub].x + Math.cos(angle) * 60,
            y: hubs[hub].y + Math.sin(angle) * 60,
            vx: 0, vy: 0,
            size: 1 + Math.random() * 1.6,
        };
    });
}

/**
 * Builds a fresh layout of hubs and particles for the given canvas size.
 * @param {number} width - Canvas width in CSS pixels.
 * @param {number} height - Canvas height in CSS pixels.
 * @returns {{hubs: Hub[], particles: Particle[]}} The new layout.
 */
export function createLayout(width, height) {
    const area = hubArea(width, height);
    const hubs = HUB_POSITIONS.map(([fx, fy], i) => ({
        x: area.x + area.w * fx, y: area.y + area.h * fy, key: LAYER_KEYS[i], label: HUB_LABELS[i], pulse: 0,
    }));
    return { hubs, particles: createParticles(hubs, area.wide) };
}

/**
 * Pushes a particle away from the pointer when it is close.
 * @param {Particle} p - The particle to move.
 * @param {{x: number, y: number}} pointer - Pointer position in canvas coordinates.
 * @returns {void}
 */
function repelFromPointer(p, pointer) {
    const dx = p.x - pointer.x;
    const dy = p.y - pointer.y;
    const distSq = dx * dx + dy * dy;
    if (distSq >= REPEL_RADIUS_SQ || distSq <= 1) return;
    const force = (1 - distSq / REPEL_RADIUS_SQ) * REPEL_FORCE;
    const dist = Math.sqrt(distSq);
    p.vx += (dx / dist) * force;
    p.vy += (dy / dist) * force;
}

/**
 * Advances every particle one frame: orbit target, spring pull, pointer repulsion, damping.
 * @param {Particle[]} particles - Particles to update in place.
 * @param {Hub[]} hubs - The hubs they orbit.
 * @param {{x: number, y: number}} pointer - Pointer position in canvas coordinates.
 * @param {number} dt - Seconds since the last frame.
 * @returns {void}
 */
export function stepParticles(particles, hubs, pointer, dt) {
    for (const p of particles) {
        const hub = hubs[p.hub];
        p.angle += p.speed * dt * ORBIT_SPEED;
        p.vx += (hub.x + Math.cos(p.angle) * p.radius - p.x) * SPRING;
        p.vy += (hub.y + Math.sin(p.angle) * p.radius * ORBIT_ASPECT - p.y) * SPRING;
        repelFromPointer(p, pointer);
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;
    }
}

/**
 * Lets each hub's arrival pulse fade out.
 * @param {Hub[]} hubs - Hubs to update in place.
 * @param {number} dt - Seconds since the last frame.
 * @returns {void}
 */
export function stepHubs(hubs, dt) {
    for (const hub of hubs) hub.pulse = Math.max(0, hub.pulse - dt * PULSE_DECAY);
}

/**
 * Queues a path of hops; each later hop starts slightly after the one before.
 * @param {Packet[]} packets - Packet list to append to.
 * @param {Array<[number, number]>} path - Hops as [fromHub, toHub] pairs.
 * @returns {void}
 */
export function queuePackets(packets, path) {
    path.forEach(([from, to], i) => packets.push({ from, to, progress: -i * PACKET_STAGGER }));
}

/**
 * Moves packets along their hop; arrivals pulse their target hub and are removed.
 * @param {Packet[]} packets - Packets to update in place.
 * @param {Hub[]} hubs - Hubs the packets travel between.
 * @param {number} dt - Seconds since the last frame.
 * @returns {void}
 */
export function stepPackets(packets, hubs, dt) {
    for (let i = packets.length - 1; i >= 0; i--) {
        packets[i].progress += dt * PACKET_SPEED;
        if (packets[i].progress < 1) continue;
        hubs[packets[i].to].pulse = 1;
        packets.splice(i, 1);
    }
}

/**
 * Finds the hub closest to a point.
 * @param {Hub[]} hubs - Candidate hubs.
 * @param {number} x - Point x in canvas coordinates.
 * @param {number} y - Point y in canvas coordinates.
 * @returns {number} Index of the nearest hub.
 */
export function nearestHub(hubs, x, y) {
    let best = 0;
    let bestDist = Infinity;
    hubs.forEach((hub, i) => {
        const dist = (hub.x - x) ** 2 + (hub.y - y) ** 2;
        if (dist < bestDist) { bestDist = dist; best = i; }
    });
    return best;
}
