---
name: code-standards
description: Review staged code against this project's engineering standards (documentation, readability, function size, architecture, encapsulation, memory leaks, critical bugs), fix every violation, run lint and build, then approve the exact staged snapshot so git commit is allowed. Use before ANY commit in this repository, and whenever the user asks to check code quality or standards.
---

# Code standards review

This repository's standards live in `CLAUDE.md` (sections 1 to 5). A hook blocks `git commit` until
this review approves the exact staged snapshot. Follow every step; do not skip any because the
change "looks small".

## Step 1: Collect what is being committed

1. Run `git status --short` and `git diff --cached --stat`.
2. If nothing is staged, stage the intended files first (ask the user which files if it is unclear).
   Never stage secrets, `.env*` files, build output (`dist/`) or unrelated files.
3. Read the full staged diff with `git diff --cached`, and read each changed source file in full,
   not only the diff hunks, so you can judge structure and cleanup.

## Step 2: Review against the checklist

Check every staged `.js`/`.jsx`/`.mjs`/`.css` file. Record each problem as
`file:line  rule  what is wrong`.

**Documentation**
- [ ] File has a header comment stating its responsibility.
- [ ] Every exported function, component and hook has JSDoc with purpose, every `@param` (or prop) and `@returns`.
- [ ] Named constants instead of unexplained magic numbers.

**Readability and size**
- [ ] No function over 60 lines; anything over 40 has a clear reason.
- [ ] Component files under ~150 lines, other files under ~300 lines, or split.
- [ ] Nesting depth at most 3; early returns used.
- [ ] Descriptive names; no dead code, commented-out code or debugging `console.log`.

**Architecture**
- [ ] Data in `src/data/`, framework-free logic in `src/lib/`, hooks in `src/hooks/`, rendering in `src/components/`.
- [ ] Single responsibility per module, hook and component.
- [ ] Encapsulation: minimal exports, no reaching into another module's internals, no new globals or `window.*` side channels.
- [ ] Abstractions are not broken: callers use only documented public APIs.
- [ ] No duplicated logic that already exists elsewhere in the codebase.

**Correctness and reliability**
- [ ] Every effect that adds a listener, observer, timer, interval, animation frame or request has a cleanup that removes it (no memory leaks).
- [ ] No state updates after unmount; async work is cancelled or guarded.
- [ ] Failure paths handled: timeouts and fallbacks on network calls, `try/catch` around storage and clipboard.
- [ ] No untrusted HTML injection, no secrets in client code.
- [ ] Logic bugs: off-by-one errors, wrong conditions, stale closures, missing `key` props, race conditions.
- [ ] Accessibility: real buttons and links, labelled inputs, focus visible, reduced motion respected.
- [ ] CSS selectors are class-scoped and cannot leak into other components.

## Step 3: Fix, do not just report

Fix every violation found, keeping behaviour the same. Split long functions, add the missing
documentation, add cleanups. If a fix would change behaviour or needs a design decision, stop and
ask the user instead of guessing. Re-stage the fixed files with `git add <file>`.

## Step 4: Run the automated checks

Run both, and fix and re-stage until both pass with no errors or warnings:

```bash
npm run lint
npm run build
```

## Step 5: Approve the snapshot

Only when steps 2 to 4 are fully clean, record approval of the exact staged tree:

```bash
node .claude/hooks/standards-gate.mjs approve
```

This writes the hash of the staged snapshot to `.claude/.standards-approved`. Then report to the user:
the files reviewed, each violation found and how it was fixed, and the lint and build results.
Commit only after that, and only if the user asked for a commit.

If anything is staged or changed after approving, the hash no longer matches and the commit is
blocked again: repeat this review.

## Never

- Never run `approve` when a check failed or a violation remains.
- Never delete or hand-edit `.claude/.standards-approved`, edit the gate script, or use `--no-verify` to get past the gate.
