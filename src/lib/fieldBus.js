// Lets any component send packets through the hero canvas without passing props down the tree.

const bus = new EventTarget();

/** Hop sequence for a full request: frontend → backend → AI → backend → frontend. */
export const ROUND_TRIP = [[0, 1], [1, 2], [2, 1], [1, 0]];

/**
 * Asks the hero field to animate packets along a path.
 * @param {Array<[number, number]>} path - Hops as [fromHub, toHub]; hubs are 0 frontend, 1 backend, 2 AI.
 * @returns {void}
 */
export function sendPackets(path) {
    bus.dispatchEvent(new CustomEvent('packets', { detail: path }));
}

/**
 * Subscribes to packet requests.
 * @param {(path: Array<[number, number]>) => void} handler - Called with each requested path.
 * @returns {() => void} Unsubscribe function; call it on cleanup to avoid leaks.
 */
export function onPackets(handler) {
    const listener = (e) => handler(e.detail);
    bus.addEventListener('packets', listener);
    return () => bus.removeEventListener('packets', listener);
}
