// Chat state for the AI twin: sends questions, types answers out word by word,
// and stops updating cleanly if the chat unmounts mid-answer.

import { useEffect, useRef, useState } from 'react';
import { askTwin } from '../lib/twin';
import { prefersReducedMotion } from '../lib/motion';

/** Pause before the answer appears, so the "thinking" glow is visible. */
const THINKING_DELAY_MS = 420;
/** Typing speed: how often new words appear and how many at a time. */
const TYPE_INTERVAL_MS = 16;
const WORDS_PER_TICK = 5;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * @typedef {{key: string, role: 'me', text: string}} UserMessage
 * @typedef {{key: string, role: 'bot', reply: import('../lib/twin').TwinReply, words: string[], shown: number}} BotMessage
 */

/**
 * Manages the twin conversation.
 * @param {object} [options]
 * @param {() => void} [options.onStart] - Called when a question is accepted (e.g. to open the chat).
 * @returns {{messages: Array<UserMessage|BotMessage>, busy: boolean, send: (question: string) => Promise<void>}}
 *   The conversation so far, whether an answer is in progress, and a function to ask a question.
 */
export default function useTwinChat({ onStart } = {}) {
    const [messages, setMessages] = useState([]);
    const [busy, setBusy] = useState(false);
    const busyRef = useRef(false);
    const aliveRef = useRef(true);
    const nextIdRef = useRef(0);

    useEffect(() => {
        aliveRef.current = true;
        return () => { aliveRef.current = false; };
    }, []);

    const setShown = (key, shown) => setMessages((all) => all.map((m) => (m.key === key ? { ...m, shown } : m)));

    async function typeOut(key, total) {
        for (let shown = 0; shown < total && aliveRef.current;) {
            await wait(TYPE_INTERVAL_MS);
            shown = Math.min(total, shown + WORDS_PER_TICK);
            setShown(key, shown);
        }
    }

    async function send(raw) {
        const question = raw.trim();
        if (!question || busyRef.current) return;
        busyRef.current = true;
        setBusy(true);
        onStart?.();
        const id = ++nextIdRef.current;
        setMessages((all) => [...all, { key: `q${id}`, role: 'me', text: question }]);

        const reduce = prefersReducedMotion();
        const [reply] = await Promise.all([askTwin(question), wait(reduce ? 0 : THINKING_DELAY_MS)]);
        if (!aliveRef.current) return;
        const words = reply.answer.split(/(\s+)/);
        const key = `a${id}`;
        setMessages((all) => [...all, { key, role: 'bot', reply, words, shown: reduce ? words.length : 0 }]);
        if (!reduce) await typeOut(key, words.length);

        busyRef.current = false;
        if (aliveRef.current) setBusy(false);
    }

    return { messages, busy, send };
}
