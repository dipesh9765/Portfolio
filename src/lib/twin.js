// Public entry point of the AI twin: one question in, one governed and grounded answer out.
// Internals (retrieval, governor, live model) live in src/lib/twin/ and are not imported elsewhere.

import { composeAnswer } from './twin/retrieval';
import { audit, charge, checkRateLimit, estimateTokens, nextRequestId } from './twin/governor';
import { askLiveModel, hasLiveModel } from './twin/liveModel';

/** Fixed token overhead per request (instructions and formatting). */
const PROMPT_OVERHEAD_TOKENS = 60;
const EMAIL = 'dipeshmarathe9765@gmail.com';

/**
 * @typedef {import('../data/twinKnowledge').TwinDoc} TwinDoc
 * @typedef {object} TwinReply
 * @property {string} id - Request id shown in the trace, e.g. "#0042".
 * @property {string} answer - Reply text; paragraphs are separated by a blank line.
 * @property {TwinDoc[]} sources - Facts the answer is based on.
 * @property {number} tokens - Estimated tokens charged (0 when blocked).
 * @property {'local'|'live'} [mode] - Where the wording came from.
 * @property {'rate'|'budget'} [blocked] - Set when the governor refused the request.
 */

/** Estimated cost of answering: question, retrieved facts, overhead and the answer itself. */
function estimateCost(question, reply) {
    const context = reply.sources.reduce((sum, d) => sum + estimateTokens(d.say), 0);
    return estimateTokens(question) + context + PROMPT_OVERHEAD_TOKENS + estimateTokens(reply.answer);
}

/** Builds the reply for a request the governor refused. */
function refusal(id, question, blocked, answer) {
    audit({ id, q: question, status: `rejected:${blocked}` });
    return { id, blocked, answer, sources: [], tokens: 0 };
}

/**
 * Answers a question as Dipesh, in first person, from résumé facts only.
 * Every call passes the governor (rate limit, token budget, audit log) first. When a live
 * model proxy is configured it rewords the answer; otherwise, or if it fails, the local
 * answer is used.
 * @param {string} question - The visitor's question.
 * @returns {Promise<TwinReply|null>} The reply, or null for an empty question.
 */
export async function askTwin(question) {
    const q = question.trim();
    if (!q) return null;
    const id = nextRequestId();

    const rate = checkRateLimit();
    if (!rate.ok) {
        return refusal(id, q, 'rate', `Rate limit reached: ${rate.limit} questions a minute. Try again in ${rate.waitSeconds}s. (Yes, that limit is the Governor doing its job.)`);
    }
    const local = composeAnswer(q);
    const tokens = estimateCost(q, local);
    if (!charge(tokens)) {
        return refusal(id, q, 'budget', `This session's token budget is spent. That's the Governor again. Email me and I'll answer in person: ${EMAIL}.`);
    }

    const live = hasLiveModel() && local.sources.length ? await askLiveModel(q, local.sources) : null;
    const mode = live ? 'live' : 'local';
    audit({ id, q, status: 'ok', mode, sources: local.sources.map((d) => d.id), tokens });
    return { id, answer: live || local.answer, sources: local.sources, tokens, mode };
}
