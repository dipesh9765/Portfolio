// Optional live answer from a model proxy. The proxy URL comes from VITE_TWIN_ENDPOINT;
// without it, or on any failure, callers keep the local answer.

/** Give up on the proxy after this long and use the local answer instead. */
const REQUEST_TIMEOUT_MS = 8000;

/**
 * Whether a live model proxy is configured for this build.
 * @returns {boolean} True when VITE_TWIN_ENDPOINT is set.
 */
export const hasLiveModel = () => Boolean(import.meta.env.VITE_TWIN_ENDPOINT);

/**
 * Asks the proxy to answer using only the given facts.
 * @param {string} question - The visitor's question.
 * @param {Array<{title: string, say: string}>} sources - Facts the answer must be grounded in.
 * @returns {Promise<string|null>} The live answer, or null if the proxy failed, timed out or replied empty.
 */
export async function askLiveModel(question, sources) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
        const res = await fetch(import.meta.env.VITE_TWIN_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question, context: sources.map((d) => ({ title: d.title, text: d.say })) }),
            signal: controller.signal,
        });
        if (!res.ok) return null;
        const data = await res.json();
        return typeof data.answer === 'string' && data.answer.trim() ? data.answer.trim() : null;
    } catch {
        return null;
    } finally {
        clearTimeout(timer);
    }
}
