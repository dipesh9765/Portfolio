// Page footer with copyright and education line.

/**
 * Footer; the year updates automatically.
 * @returns {JSX.Element}
 */
const Footer = () => (
    <footer className="site-footer">
        <span>© {new Date().getFullYear()} Dipesh Marathe</span>
        <span>B.Tech CSE · GCOE Amravati · CGPA 8.96</span>
    </footer>
);

export default Footer;
