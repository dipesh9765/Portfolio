// Closing call to action: email (with copy button) and profile links.

import useCopyText from '../hooks/useCopyText';
import { links } from '../data/portfolioData';

/**
 * Contact section. The email is shown as selectable text because mailto: links do not
 * work for every visitor; the button copies it instead.
 * @returns {JSX.Element}
 */
const Contact = () => {
    const { label, copy, targetRef } = useCopyText(links.email, 'Copy email');

    return (
        <section className="section" id="contact">
            <div className="contact">
                <div className="contact-label">OPEN TO NEW ROLES</div>
                <h2>Let's build something that ships.</h2>
                <div className="contact-row">
                    <code ref={targetRef}>{links.email}</code>
                    <button className="btn" type="button" onClick={copy}>{label}</button>
                    <a className="btn" href={links.github} target="_blank" rel="noreferrer">GitHub</a>
                    <a className="btn" href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                    <a className="btn" href={links.leetcode} target="_blank" rel="noreferrer">LeetCode</a>
                    <a className="btn" href={links.resume} target="_blank" rel="noreferrer">Résumé</a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
