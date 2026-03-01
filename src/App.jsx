import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CanvasBackground from './components/CanvasBackground';
import useTheme from './hooks/useTheme';

function App() {
    const [theme, toggleTheme] = useTheme();

    return (
        <div className="min-h-screen text-gray-800 dark:text-gray-100 transition-colors duration-300">
            <CanvasBackground />
            <Header theme={theme} toggleTheme={toggleTheme} />

            <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Contact />
            </main>

            <Footer />
        </div>
    );
}

export default App;
