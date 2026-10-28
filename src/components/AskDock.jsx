// The always-visible "Ask Dipesh" bar (bottom-right on desktop, bottom-centre on phones)
// and the chat sheet it opens.

import { useEffect, useRef, useState } from 'react';
import ChatSheet from './ChatSheet';
import useTwinChat from '../hooks/useTwinChat';
import { onAskRequest } from '../lib/askBus';
import { ROUND_TRIP, sendPackets } from '../lib/fieldBus';
import { prefersReducedMotion } from '../lib/motion';

/** Three-node icon in the bar; its nodes pulse while an answer is being prepared. */
const TwinMark = () => (
    <svg className="mark" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 17L12 6.5L18 17Z" /><circle cx="12" cy="6.5" r="2.6" /><circle cx="18" cy="17" r="2.6" /><circle cx="6" cy="17" r="2.6" />
    </svg>
);

/** Arrow icon for the send button. */
const SendIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
);

/**
 * Chat entry point for the AI twin. Questions arrive from the bar, the suggestion chips,
 * or any "Ask me about this" button (via the ask bus); each one also sends a packet
 * round trip through the hero canvas.
 * @returns {JSX.Element}
 */
const AskDock = () => {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const inputRef = useRef(null);
    const sendRef = useRef(null);
    const { messages, busy, send } = useTwinChat({
        onStart: () => {
            setOpen(true);
            if (!prefersReducedMotion()) sendPackets(ROUND_TRIP);
        },
    });

    // Keep the latest send() for the bus subscription without resubscribing every render.
    useEffect(() => { sendRef.current = send; });
    useEffect(() => onAskRequest((question) => sendRef.current(question)), []);

    const close = () => { setOpen(false); inputRef.current?.blur(); };
    const submit = (e) => { e.preventDefault(); send(input); setInput(''); };

    return (
        <div className={`dock${busy ? ' thinking' : ''}`} onKeyDown={(e) => { if (e.key === 'Escape') close(); }}>
            {open && <ChatSheet messages={messages} onAsk={send} onClose={close} />}
            <form className="bar" autoComplete="off" onSubmit={submit}>
                <TwinMark />
                <label className="sr" htmlFor="ask">Ask Dipesh anything</label>
                <input id="ask" ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onFocus={() => setOpen(true)}
                    placeholder="Ask me anything about my work" maxLength={200} enterKeyHint="send" />
                <button className="go" type="submit" disabled={busy} aria-label="Send question"><SendIcon /></button>
            </form>
        </div>
    );
};

export default AskDock;
