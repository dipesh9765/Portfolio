// "How I build" section: the stations of an AI request and a trace you can replay.

import { useEffect, useRef, useState } from 'react';
import { pipelineNodes, pipelineSteps } from '../data/portfolioData';
import { sendPackets } from '../lib/fieldBus';
import { prefersReducedMotion } from '../lib/motion';

/** Time each trace step stays active during a replay. */
const STEP_MS = 950;

/**
 * At rest the whole trace is shown. "Replay request" walks through it step by step,
 * lights up the active station and sends matching packets through the hero canvas.
 * All pending replay timers are cleared on unmount.
 * @returns {JSX.Element}
 */
const HowIBuild = () => {
    const [step, setStep] = useState(null);
    const timers = useRef([]);

    useEffect(() => {
        const pending = timers.current;
        return () => pending.forEach(clearTimeout);
    }, []);

    const replay = () => {
        timers.current.forEach(clearTimeout);
        timers.current.length = 0;
        if (prefersReducedMotion()) { setStep(null); return; }
        pipelineSteps.forEach((s, i) => {
            timers.current.push(setTimeout(() => { setStep(i); sendPackets([s.packet]); }, i * STEP_MS));
        });
        timers.current.push(setTimeout(() => setStep(null), pipelineSteps.length * STEP_MS));
    };

    const running = step !== null;
    const lines = running ? pipelineSteps.slice(0, step + 1) : pipelineSteps;
    const activeNode = running ? pipelineSteps[step].node : null;

    return (
        <section className="section" id="how">
            <div className="eyebrow">How I build</div>
            <h2 className="title">One request, through every layer.</h2>
            <div className="pipe">
                <div className="panel">
                    <div className="panel-label">Architecture of an AI feature</div>
                    <div className="stations">
                        {pipelineNodes.map((n, i) => (
                            <div key={n.name} className={`station ${n.layer}${!running || activeNode === i ? ' on' : ''}`}>
                                <span className="dot"></span>
                                <div><b>{n.name}</b><small>{n.detail}</small></div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="panel">
                    <div className="pipehead">
                        <span className="panel-label">Request trace</span>
                        <button className="btn primary" type="button" onClick={replay} disabled={running}>
                            {running ? 'Running…' : 'Replay request'}
                        </button>
                    </div>
                    <div className="console" aria-live="polite">
                        {lines.map((s, i) => (
                            <div key={i} className={`line ${s.layer}`}><i>{s.tag}</i><span>{s.text}</span></div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowIBuild;
