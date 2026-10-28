// Experience section: employer summary, role timeline and skills grouped by layer.

import { roles, toolbox } from '../data/portfolioData';

/**
 * Lists each role's achievements, colour-coded by layer, followed by the toolbox.
 * @returns {JSX.Element}
 */
const Experience = () => (
    <section className="section" id="experience">
        <div className="eyebrow">Experience</div>
        <div className="exp">
            <div>
                <h3>Novatech Software</h3>
                <div className="exp-meta">Associate Software Developer<br />Jan 2024 to present · Nagpur</div>
                <p className="exp-stack">JavaScript · Node.js · Java<br />React · Sencha ExtJS · MySQL<br />PostgreSQL · Redis · Agile</p>
            </div>
            <div className="roles">
                {roles.map((r) => (
                    <div className="role" key={r.title}>
                        <div className="role-head"><h4>{r.title}</h4><time>{r.period}</time></div>
                        <ul>
                            {r.items.map(([layer, text]) => (
                                <li key={text}><span className={`dot ${layer}`}></span><span>{text}</span></li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
        <div className="toolbox">
            {toolbox.map((t) => (
                <div className={`tool ${t.layer}`} key={t.name}>
                    <b><span className="dot"></span>{t.name}</b>
                    <p>{t.items}</p>
                </div>
            ))}
        </div>
    </section>
);

export default Experience;
