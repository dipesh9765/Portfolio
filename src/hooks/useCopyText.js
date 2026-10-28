// Copy-to-clipboard with a short-lived confirmation label, falling back to selecting
// the text where the clipboard API is unavailable or refused.

import { useEffect, useRef, useState } from 'react';

/** How long the confirmation label stays before reverting. */
const FEEDBACK_MS = 1800;

/**
 * Selects the text inside an element so the visitor can copy it by hand.
 * @param {HTMLElement|null} element - Element whose contents to select.
 * @returns {void}
 */
function selectContents(element) {
    if (!element) return;
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
}

/**
 * Copies text and reports the outcome through a button label.
 * @param {string} text - Text to copy.
 * @param {string} idleLabel - Label shown when nothing is happening, e.g. "Copy email".
 * @returns {{label: string, copy: () => void, targetRef: import('react').RefObject<HTMLElement>}}
 *   The current label, the click handler, and a ref for the element to select as a fallback.
 */
export default function useCopyText(text, idleLabel) {
    const [label, setLabel] = useState(idleLabel);
    const targetRef = useRef(null);
    const timerRef = useRef(0);

    useEffect(() => () => clearTimeout(timerRef.current), []);

    const flash = (message) => {
        clearTimeout(timerRef.current);
        setLabel(message);
        timerRef.current = setTimeout(() => setLabel(idleLabel), FEEDBACK_MS);
    };

    const fallback = () => {
        selectContents(targetRef.current);
        flash('Press Ctrl+C');
    };

    const copy = () => {
        if (!navigator.clipboard) { fallback(); return; }
        navigator.clipboard.writeText(text).then(() => flash('Copied'), fallback);
    };

    return { label, copy, targetRef };
}
