// Light/dark theme choice: follows the system until the visitor picks one, then remembers it.

import { useState, useEffect } from 'react';

/** localStorage key for the saved choice. */
const KEY = 'theme';

/**
 * Reads a previously saved theme, if storage is available.
 * @returns {'light'|'dark'|null} The saved theme, or null to follow the system.
 */
function readSaved() {
    try {
        const saved = localStorage.getItem(KEY);
        return saved === 'light' || saved === 'dark' ? saved : null;
    } catch {
        return null;
    }
}

/**
 * Theme state applied as `data-theme` on <html>, which the CSS tokens read.
 * @returns {[('light'|'dark'|null), () => void]} The current choice (null means "follow the system")
 *   and a toggle that pins the opposite of what is currently shown.
 */
export default function useTheme() {
    const [theme, setTheme] = useState(readSaved);

    useEffect(() => {
        const root = document.documentElement;
        if (theme) root.setAttribute('data-theme', theme);
        else root.removeAttribute('data-theme');
        try {
            if (theme) localStorage.setItem(KEY, theme);
        } catch {
            // storage blocked; the choice lasts for this visit only
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((current) => {
            const shown = current || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
            return shown === 'dark' ? 'light' : 'dark';
        });
    };

    return [theme, toggleTheme];
}
