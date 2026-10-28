// Finds the résumé facts that answer a question and composes a first-person reply from them.
// Keyword retrieval with synonyms and a small TF-IDF-style score; nothing is generated.

import { twinDocs } from '../../data/twinKnowledge';
import { STOP_WORDS, SYNONYMS, INTENTS } from './vocabulary';

/** Field weights: tags and titles describe a fact more precisely than its full text. */
const TAG_WEIGHT = 3;
const TITLE_WEIGHT = 3;
const TEXT_WEIGHT = 1;
/** Synonym matches count half as much as words the visitor actually typed. */
const SYNONYM_WEIGHT = 0.5;
/** Caps how much one repeated word can add to a fact's score. */
const MAX_TERM_COUNT = 6;
/** Below this score the best match is too weak to answer from. */
const MIN_ANSWER_SCORE = 1.2;
/** Score given to a fact chosen by an intent rule, so it always ranks first. */
const INTENT_SCORE = 99;
/** A second fact is added to the answer when it scores at least this share of the first. */
const SECOND_ANSWER_SHARE = 0.75;
const EXTRA_SOURCE_SHARE = 0.6;
const EMAIL = 'dipeshmarathe9765@gmail.com';

/**
 * @typedef {import('../../data/twinKnowledge').TwinDoc} TwinDoc
 * @typedef {{doc: TwinDoc, score: number}} Hit
 */

const stem = (word) => (word.length > 4 && word.endsWith('s') && !word.endsWith('ss') ? word.slice(0, -1) : word);
const words = (text) => (text.toLowerCase().match(/[a-z0-9]+/g) || []).filter((w) => !STOP_WORDS.has(w)).map(stem);
const docById = (id) => twinDocs.find((d) => d.id === id);

/** Builds the per-fact word counts and the document frequency of each word, once at load. */
function buildIndex() {
    const bags = new Map();
    const docFrequency = {};
    for (const doc of twinDocs) {
        const bag = {};
        const add = (text, weight) => words(text).forEach((w) => { bag[w] = (bag[w] || 0) + weight; });
        add(doc.tags, TAG_WEIGHT);
        add(doc.title, TITLE_WEIGHT);
        add(doc.say, TEXT_WEIGHT);
        bags.set(doc, bag);
        Object.keys(bag).forEach((w) => { docFrequency[w] = (docFrequency[w] || 0) + 1; });
    }
    return { bags, docFrequency };
}

const INDEX = buildIndex();

/** Turns a question into weighted search terms, adding synonyms at reduced weight. */
function queryTerms(question) {
    const terms = {};
    for (const w of words(question)) {
        terms[w] = 1;
        for (const synonym of (SYNONYMS[w] || '').split(' ').filter(Boolean)) {
            const s = stem(synonym);
            if (!terms[s]) terms[s] = SYNONYM_WEIGHT;
        }
    }
    return terms;
}

/** Scores every fact against the question and returns the best `limit` hits. */
function rankByKeywords(question, limit) {
    const terms = Object.entries(queryTerms(question));
    const docCount = twinDocs.length;
    return twinDocs
        .map((doc) => {
            const bag = INDEX.bags.get(doc);
            const score = terms.reduce((sum, [term, weight]) => (bag[term]
                ? sum + weight * Math.min(bag[term], MAX_TERM_COUNT) * Math.log(1 + docCount / INDEX.docFrequency[term])
                : sum), 0);
            return { doc, score };
        })
        .filter((hit) => hit.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
}

/**
 * Finds the facts that best answer a question. Intent rules (e.g. "how does this chat work")
 * take priority over keyword scoring.
 * @param {string} question - The visitor's question.
 * @param {number} [limit=3] - Maximum number of hits to return.
 * @returns {Hit[]} Best hits first.
 */
export function retrieve(question, limit = 3) {
    const intent = INTENTS.find(([pattern]) => pattern.test(question));
    if (!intent) return rankByKeywords(question, limit);
    const forced = docById(intent[1]);
    const rest = rankByKeywords(question, limit).filter((hit) => hit.doc !== forced);
    return [{ doc: forced, score: INTENT_SCORE }, ...rest].slice(0, limit);
}

/** Reply for "what are you proudest of": the three hero projects, Governor first. */
function proudestAnswer(governor) {
    return {
        answer: `Three things, and the AI Governor comes first. ${governor.say}\n\nThe other two: the RAG assistant (+87% user satisfaction) and the Use Case Flow Editor, which turns structured flows into UML diagrams and AI-written test cases.`,
        sources: [governor, docById('rag'), docById('uceditor')],
    };
}

/**
 * Composes a first-person answer from the facts that match a question.
 * When nothing matches well enough, it says so instead of guessing.
 * @param {string} question - The visitor's question.
 * @returns {{answer: string, sources: TwinDoc[]}} Reply text (paragraphs split by a blank line) and the facts it used.
 */
export function composeAnswer(question) {
    const [top, second, third] = retrieve(question, 3);
    if (!top || top.score < MIN_ANSWER_SCORE) {
        return {
            answer: `That isn't in my notes yet, so I won't guess. Ask me about the AI Governor, the RAG assistant, the Use Case Flow Editor, my MCP server, or competitive programming. Or email me at ${EMAIL}.`,
            sources: [],
        };
    }
    if (top.score === INTENT_SCORE && top.doc.id === 'governor') return proudestAnswer(top.doc);

    let answer = top.doc.say;
    const sources = [top.doc];
    if (second && second.score > top.score * SECOND_ANSWER_SHARE) {
        answer += `\n\n${second.doc.say}`;
        sources.push(second.doc);
    }
    if (third && third.score > top.score * EXTRA_SOURCE_SHARE) sources.push(third.doc);
    return { answer, sources };
}
