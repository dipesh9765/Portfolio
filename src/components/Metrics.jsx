// The strip of headline results under the hero.

import { metrics } from '../data/portfolioData';

/**
 * Shows each headline number with what it measured.
 * @returns {JSX.Element}
 */
const Metrics = () => (
    <div className="metrics" aria-label="Results from shipped work">
        {metrics.map((m) => (
            <div className="metric" key={m.value}><b>{m.value}</b><span>{m.label}</span></div>
        ))}
    </div>
);

export default Metrics;
