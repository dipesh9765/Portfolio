// One message in the Ask Dipesh chat: the visitor's question, or the twin's governed answer.

/** Colour layer for each fact group, used for the source-chip dots. */
const GROUP_LAYER = { ai: 'ai', ui: 'fe', be: 'be', side: 'ai', found: 'be', about: 'fe' };

/**
 * The governor trace line above an answer: request id, tokens charged, sources found.
 * @param {{reply: import('../lib/twin').TwinReply}} props
 * @returns {JSX.Element}
 */
function Trace({ reply }) {
    if (reply.blocked) return <div className="m-trace"><b>governor</b> {reply.blocked} limit reached</div>;
    const count = reply.sources.length;
    return (
        <div className="m-trace">
            <b>governor ✓</b> {reply.id}
            <span>−{reply.tokens} tok</span>
            <span>{count ? `${count} source${count > 1 ? 's' : ''}` : 'nothing on record'}</span>
            {reply.mode === 'live' && <span>live model</span>}
        </div>
    );
}

/**
 * Chips naming the facts an answer was built from.
 * @param {{sources: import('../data/twinKnowledge').TwinDoc[]}} props
 * @returns {JSX.Element|null}
 */
function SourceChips({ sources }) {
    if (!sources.length) return null;
    return (
        <div className="m-src">
            {sources.map((doc) => (
                <span key={doc.id}><i className={`dot ${GROUP_LAYER[doc.group]}`}></i>{doc.title}</span>
            ))}
        </div>
    );
}

/**
 * Renders a chat message. While an answer is still typing, only the words shown so far
 * appear; once complete, it is split into paragraphs and its sources are listed.
 * @param {{message: import('../hooks/useTwinChat').UserMessage | import('../hooks/useTwinChat').BotMessage}} props
 * @returns {JSX.Element}
 */
const ChatMessage = ({ message }) => {
    if (message.role === 'me') return <div className="m-me">{message.text}</div>;
    const { reply, words, shown } = message;
    const typing = shown < words.length;
    return (
        <div className="m-bot">
            <Trace reply={reply} />
            {typing
                ? <p style={{ whiteSpace: 'pre-line' }}>{words.slice(0, shown).join('')}</p>
                : reply.answer.split('\n\n').map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            {!typing && <SourceChips sources={reply.sources} />}
        </div>
    );
};

export default ChatMessage;
