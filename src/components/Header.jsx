// Site header: wordmark, section links (hidden on phones) and the theme toggle.

/**
 * Top bar of the page.
 * @param {object} props
 * @param {() => void} props.toggleTheme - Switches between light and dark.
 * @returns {JSX.Element}
 */
const Header = ({ toggleTheme }) => (
    <header className="site-header">
        <a className="logo" href="#top">
            <span className="dot" style={{ '--c': 'var(--accent)' }}></span>dipesh<b>/</b>marathe
        </a>
        <nav className="site-nav" aria-label="Primary">
            <a href="#how">How I build</a>
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#proof">Recognition</a>
            <a href="#contact">Contact</a>
            <button className="iconbtn" type="button" onClick={toggleTheme} aria-label="Switch colour theme">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
            </button>
        </nav>
    </header>
);

export default Header;
