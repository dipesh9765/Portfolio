// Lets "Ask me about this" buttons anywhere on the page hand a question to the AskDock.

const bus = new EventTarget();

/**
 * Sends a question to the AskDock, which opens and answers it.
 * @param {string} question - The question to ask.
 * @returns {void}
 */
export function requestAsk(question) {
    bus.dispatchEvent(new CustomEvent('ask', { detail: question }));
}

/**
 * Subscribes to questions sent with {@link requestAsk}.
 * @param {(question: string) => void} handler - Called with each question.
 * @returns {() => void} Unsubscribe function; call it on cleanup to avoid leaks.
 */
export function onAskRequest(handler) {
    const listener = (e) => handler(e.detail);
    bus.addEventListener('ask', listener);
    return () => bus.removeEventListener('ask', listener);
}
