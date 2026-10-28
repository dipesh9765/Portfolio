// React wrapper for the hero field animation; all simulation and drawing lives in src/lib/field/.

import { useEffect, useRef } from 'react';
import { createFieldEngine } from '../lib/field/fieldEngine';
import { prefersReducedMotion } from '../lib/motion';

/**
 * Animated network of frontend, backend and AI particle clusters behind the hero.
 * The canvas fills its parent element, which is also where clicks send packets.
 * @param {object} props
 * @param {number} props.focus - Hub to highlight (0 frontend, 1 backend, 2 AI), or -1 for none.
 * @param {string|null} props.theme - Current theme choice; a change re-reads the colours.
 * @returns {JSX.Element} The canvas element.
 */
const FieldCanvas = ({ focus, theme }) => {
    const canvasRef = useRef(null);
    const engineRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const engine = createFieldEngine(canvas, canvas.parentElement, { reduceMotion: prefersReducedMotion() });
        engineRef.current = engine;
        return () => {
            engine.destroy();
            engineRef.current = null;
        };
    }, []);

    useEffect(() => { engineRef.current?.setFocus(focus); }, [focus]);
    useEffect(() => { engineRef.current?.refreshColors(); }, [theme]);

    return <canvas ref={canvasRef} className="field" aria-hidden="true" />;
};

export default FieldCanvas;
