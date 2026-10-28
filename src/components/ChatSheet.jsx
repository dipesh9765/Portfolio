// The open chat panel above the Ask bar: header, conversation and suggestion chips.

import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import { twinSuggestions } from '../data/twinKnowledge';

const GREETING = 'Hi, I’m Dipesh’s AI twin. Ask about my projects, stack or experience. I only answer from my résumé, so if something isn’t on record, I’ll say so.';

/**
 * Chat panel. Keeps the conversation scrolled to the newest message.
 * @param {object} props
 * @param {Array<object>} props.messages - Conversation from useTwinChat.
 * @param {(question: string) => void} props.onAsk - Sends a suggestion chip's question.
 * @param {() => void} props.onClose - Closes the panel.
 * @returns {JSX.Element}
 */
const ChatSheet = ({ messages, onAsk, onClose }) => {
    const msgsRef = useRef(null);

    useEffect(() => {
        msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
    }, [messages]);

    return (
        <div className="sheet" role="dialog" aria-label="Ask Dipesh">
            <div className="sheet-head">
                <div><b>Ask Dipesh</b><small>my AI twin · answers only from my résumé</small></div>
                <button className="iconbtn" type="button" onClick={onClose} aria-label="Close chat">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
                </button>
            </div>
            <div className="msgs" ref={msgsRef} aria-live="polite">
                <div className="m-bot"><p>{GREETING}</p></div>
                {messages.map((m) => <ChatMessage key={m.key} message={m} />)}
            </div>
            <div className="sugg">
                {twinSuggestions.map((s) => <button key={s} type="button" onClick={() => onAsk(s)}>{s}</button>)}
            </div>
        </div>
    );
};

export default ChatSheet;
