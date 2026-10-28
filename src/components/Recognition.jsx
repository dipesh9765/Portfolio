// Recognition section: awards and achievements as a dated list.

import { awards } from '../data/portfolioData';

/**
 * Shows each award with when it happened and a one-line note.
 * @returns {JSX.Element}
 */
const Recognition = () => (
    <section className="section" id="proof">
        <div className="eyebrow">Recognition</div>
        <h2 className="title">Results other people measured.</h2>
        <div className="awards">
            {awards.map((a) => (
                <div className="award" key={a.title}>
                    <span>{a.when}</span>
                    <div><b>{a.title}</b><small>{a.note}</small></div>
                </div>
            ))}
        </div>
    </section>
);

export default Recognition;
