// Opening section: headline, pitch, calls to action and the live layer field behind them.

import { useState } from 'react';
import FieldCanvas from './FieldCanvas';
import LayerLegend from './LayerLegend';

/**
 * Hero section. Hovering or focusing a layer chip highlights that layer in the canvas.
 * @param {object} props
 * @param {string|null} props.theme - Current theme choice, passed on so the canvas recolours.
 * @returns {JSX.Element}
 */
const Hero = ({ theme }) => {
    const [focus, setFocus] = useState(-1);

    return (
        <div className="hero" id="top">
            <FieldCanvas focus={focus} theme={theme} />
            <div className="hero-copy">
                <div className="eyebrow">Associate Software Developer · Nagpur, India</div>
                <h1>
                    <span className="fe">Interfaces.</span>
                    <span className="be">Services.</span>
                    <span className="ai">Intelligence.</span>
                </h1>
                <p className="lead">
                    Full-stack developer who ships LLM features into production: <b>RAG</b>, a custom <b>MCP server</b>, and an{' '}
                    <b>AI governor</b> that keeps every model call limited, queued and audited.
                </p>
                <div className="cta">
                    <a className="btn primary" href="#how">Follow a request</a>
                    <a className="btn" href="#work">See the work</a>
                </div>
                <LayerLegend onFocus={setFocus} />
                <div className="hint">Tap the field to send a packet, or ask me anything from the bar below.</div>
            </div>
        </div>
    );
};

export default Hero;
