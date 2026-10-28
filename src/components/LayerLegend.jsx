// Frontend / Backend / AI chips under the hero that control the layer field.

import { useState } from 'react';
import { sendPackets } from '../lib/fieldBus';

/** One chip per hub, in hub order (0 frontend, 1 backend, 2 AI). */
const LAYERS = [
    { hub: 0, layer: 'fe', label: 'Frontend · React, ExtJS' },
    { hub: 1, layer: 'be', label: 'Backend · Node, Java' },
    { hub: 2, layer: 'ai', label: 'AI · RAG, MCP' },
];

/**
 * Layer chips: hover or focus highlights a layer; click sends a packet from it and toggles its pressed state.
 * @param {object} props
 * @param {(hub: number) => void} props.onFocus - Called with the hub to highlight, or -1 to clear.
 * @returns {JSX.Element}
 */
const LayerLegend = ({ onFocus }) => {
    const [pressed, setPressed] = useState(-1);

    const press = (hub) => {
        setPressed((current) => (current === hub ? -1 : hub));
        sendPackets([[hub, (hub + 1) % LAYERS.length]]);
    };

    return (
        <div className="legend" role="group" aria-label="Highlight a layer in the animation">
            {LAYERS.map(({ hub, layer, label }) => (
                <button
                    key={hub}
                    className={`chip ${layer}`}
                    type="button"
                    aria-pressed={pressed === hub}
                    onMouseEnter={() => onFocus(hub)}
                    onMouseLeave={() => onFocus(-1)}
                    onFocus={() => onFocus(hub)}
                    onBlur={() => onFocus(-1)}
                    onClick={() => press(hub)}
                >
                    <span className="dot"></span>{label}
                </button>
            ))}
        </div>
    );
};

export default LayerLegend;
