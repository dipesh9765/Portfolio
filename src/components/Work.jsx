// Selected work section: project cards filterable by layer, each with "Ask me about this".

import { useState } from 'react';
import { LAYER_NAMES, work } from '../data/portfolioData';
import { requestAsk } from '../lib/askBus';

/** Filter chips as [layer key, label]; 'all' shows every project. */
const filters = [['all', 'All work'], ['fe', 'Frontend'], ['be', 'Backend'], ['ai', 'AI']];

/**
 * Moves a card's hover spotlight to follow the pointer.
 * @param {PointerEvent} e - Pointer event on the card.
 * @returns {void}
 */
const spotlight = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

/**
 * Project grid with layer filters.
 * @returns {JSX.Element}
 */
const Work = () => {
    const [filter, setFilter] = useState('all');
    const shown = work.filter((w) => filter === 'all' || w.layers.includes(filter));

    return (
        <section className="section" id="work">
            <div className="eyebrow">Selected work</div>
            <h2 className="title">Things that run in production, and things I built to learn.</h2>
            <div className="filters" role="group" aria-label="Filter by layer">
                {filters.map(([id, label]) => (
                    <button key={id} className={`chip ${id === 'all' ? '' : id}`} type="button" aria-pressed={filter === id} onClick={() => setFilter(id)}>
                        {id !== 'all' && <span className="dot"></span>}{label}
                    </button>
                ))}
            </div>
            <div className="grid">
                {shown.map((w) => (
                    <article className="card" key={w.title} onPointerMove={spotlight}>
                        <div className="card-top">
                            <span>{w.status}</span>
                            <span className="card-layers" aria-label={`Layers: ${w.layers.map((l) => LAYER_NAMES[l]).join(', ')}`}>
                                {w.layers.map((l) => <span key={l} className={`dot ${l}`} title={LAYER_NAMES[l]}></span>)}
                            </span>
                        </div>
                        <h3>{w.title}</h3>
                        <p>{w.description}</p>
                        <div className="card-tags">{w.tags}</div>
                        <div className="card-out"><b>{w.result}</b><span>{w.resultLabel}</span></div>
                        <div className="card-actions">
                            {w.href && <a className="more" href={w.href} target="_blank" rel="noreferrer">View on GitHub →</a>}
                            <button className="askthis" type="button" onClick={() => requestAsk(`Tell me about ${w.title}`)}>Ask me about this →</button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Work;
