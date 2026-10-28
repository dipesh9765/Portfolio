// Commit gate for the code-standards review. Blocks `git commit` unless the
// /code-standards skill approved exactly the snapshot that is currently staged.
//
// Usage:
//   node .claude/hooks/standards-gate.mjs approve   record approval of the staged snapshot
//   node .claude/hooks/standards-gate.mjs check     PreToolUse hook: reads the tool call from stdin

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Repository root: this file lives in <root>/.claude/hooks/. */
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

/** Where the approved snapshot hash is kept (gitignored). */
const MARKER = join(ROOT, '.claude', '.standards-approved');

/** Exit code that tells Claude Code to block the tool call and show stderr to Claude. */
const BLOCK = 2;

/** Matches `git commit`, including `git -C dir commit` and commands chained with && or ;. */
const GIT_COMMIT = /\bgit\b(?:\s+-[cC]\s+\S+)*\s+commit\b/;

/** Matches commit flags that stage files at commit time, bypassing the reviewed snapshot. */
const AUTO_STAGE = /\s(?:-a|--all|-[a-zA-Z]*a[a-zA-Z]*)\b|\s--include\b|\s-i\b/;

/**
 * Returns the hash of the tree that is currently staged in the git index.
 * Identical staged content always yields the same hash, so it identifies the exact snapshot.
 * @returns {string} The staged tree hash.
 */
function stagedTreeHash() {
    return execFileSync('git', ['write-tree'], { cwd: ROOT, encoding: 'utf8' }).trim();
}

/**
 * Reads the snapshot hash recorded by the last approval.
 * @returns {string|null} The approved hash, or null when nothing has been approved.
 */
function approvedHash() {
    return existsSync(MARKER) ? readFileSync(MARKER, 'utf8').trim() : null;
}

/**
 * Records the currently staged snapshot as reviewed and approved.
 * @returns {void}
 */
function approve() {
    const hash = stagedTreeHash();
    writeFileSync(MARKER, `${hash}\n`);
    console.log(`Standards approval recorded for staged snapshot ${hash.slice(0, 12)}.`);
}

/**
 * Extracts the flags of the `git commit` call, ignoring the commit message: quoted
 * strings are removed and anything after the first line (a heredoc body) is dropped,
 * so a message that merely mentions "-a" is not mistaken for the flag.
 * @param {string} command - The full shell command.
 * @returns {string} The commit invocation with message text removed.
 */
function commitFlags(command) {
    const commitPart = command.slice(command.search(GIT_COMMIT));
    return commitPart.split('\n')[0].replace(/'[^']*'|"[^"]*"/g, '');
}

/**
 * Reads the whole of stdin as text.
 * @returns {Promise<string>} The text Claude Code sent to the hook.
 */
async function readStdin() {
    let text = '';
    for await (const chunk of process.stdin) text += chunk;
    return text;
}

/**
 * Stops the tool call and tells Claude why.
 * @param {string} reason - Explanation shown to Claude.
 * @returns {never}
 */
function block(reason) {
    console.error(`Commit blocked by the code-standards gate: ${reason}`);
    process.exit(BLOCK);
}

/**
 * PreToolUse hook entry point: lets every command through except a `git commit`
 * whose staged snapshot has not been approved by the /code-standards review.
 * @returns {Promise<void>}
 */
async function check() {
    const input = JSON.parse((await readStdin()) || '{}');
    const command = input?.tool_input?.command ?? '';
    if (!GIT_COMMIT.test(command)) return;

    if (AUTO_STAGE.test(commitFlags(command))) {
        block('do not use -a/--all/-i; stage files explicitly with `git add`, then run the /code-standards review.');
    }
    const approved = approvedHash();
    if (!approved) block('no approval found. Run the /code-standards skill on the staged changes first.');
    if (approved !== stagedTreeHash()) {
        block('the staged changes differ from what was reviewed. Run the /code-standards skill again.');
    }
}

const mode = process.argv[2];
if (mode === 'approve') approve();
else if (mode === 'check') await check();
else {
    console.error('Usage: node .claude/hooks/standards-gate.mjs <approve|check>');
    process.exit(1);
}
