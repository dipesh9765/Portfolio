// Page layout: header, the six content sections, footer, and the floating Ask Dipesh dock.

import Header from './components/Header';
import Hero from './components/Hero';
import Metrics from './components/Metrics';
import HowIBuild from './components/HowIBuild';
import Work from './components/Work';
import Experience from './components/Experience';
import Recognition from './components/Recognition';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AskDock from './components/AskDock';
import useTheme from './hooks/useTheme';

/**
 * Root component. Owns the theme so the header toggle and the hero canvas stay in sync.
 * @returns {JSX.Element}
 */
function App() {
    const [theme, toggleTheme] = useTheme();

    return (
        <>
            <div className="wrap">
                <Header toggleTheme={toggleTheme} />
                <main>
                    <Hero theme={theme} />
                    <Metrics />
                    <HowIBuild />
                    <Work />
                    <Experience />
                    <Recognition />
                    <Contact />
                </main>
                <Footer />
            </div>
            <AskDock />
        </>
    );
}

export default App;
