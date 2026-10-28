// A small version of the AI Governor: per-visit rate limit, token budget and audit log
// in front of every twin question. State is private to this module.

/** Questions allowed per rolling minute. */
const REQUESTS_PER_MINUTE = 6;
/** Tokens a visitor may spend in one page visit. */
const SESSION_TOKEN_BUDGET = 6000;
const WINDOW_MS = 60000;
/** Oldest audit entries are dropped past this, so the log cannot grow without bound. */
const MAX_AUDIT_ENTRIES = 50;
/** Rough token estimate: about four characters per token. */
const CHARS_PER_TOKEN = 4;
/** First request id shown to visitors, so ids look like a live system's (#0042). */
const FIRST_REQUEST_ID = 42;

const state = { used: 0, hits: [], audit: [], nextId: FIRST_REQUEST_ID };

/**
 * Estimates how many tokens a piece of text costs.
 * @param {string} text - Any text.
 * @returns {number} Estimated tokens.
 */
export const estimateTokens = (text) => Math.ceil(text.length / CHARS_PER_TOKEN);

/** Forgets requests older than the rate-limit window. */
function pruneWindow(now) {
    state.hits = state.hits.filter((t) => now - t < WINDOW_MS);
}

/**
 * Appends an entry to the audit log, keeping only the most recent entries.
 * @param {object} entry - What to record (id, question, status and details).
 * @returns {void}
 */
export function audit(entry) {
    state.audit.unshift({ at: new Date().toISOString(), ...entry });
    state.audit.length = Math.min(state.audit.length, MAX_AUDIT_ENTRIES);
}

/**
 * Issues the next request id, formatted like "#0042".
 * @returns {string} The id.
 */
export function nextRequestId() {
    return `#${String(state.nextId++).padStart(4, '0')}`;
}

/**
 * Checks the rate limit for a new question.
 * @returns {{ok: true} | {ok: false, waitSeconds: number, limit: number}} Whether it may proceed, and if not, how long to wait.
 */
export function checkRateLimit() {
    const now = Date.now();
    pruneWindow(now);
    if (state.hits.length < REQUESTS_PER_MINUTE) return { ok: true };
    return { ok: false, limit: REQUESTS_PER_MINUTE, waitSeconds: Math.ceil((WINDOW_MS - (now - state.hits[0])) / 1000) };
}

/**
 * Charges a request against the budget if it fits.
 * @param {number} tokens - Estimated cost of the request.
 * @returns {boolean} True if charged; false when the session budget would be exceeded.
 */
export function charge(tokens) {
    if (state.used + tokens > SESSION_TOKEN_BUDGET) return false;
    state.used += tokens;
    state.hits.push(Date.now());
    return true;
}
