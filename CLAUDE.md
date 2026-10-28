# Portfolio: engineering standards

These standards apply to every line of code written in this repository, by Claude or by a person.
They are not suggestions. If a task seems to need breaking one, stop and ask first.

## Project shape

- React 19 + Vite, plain JavaScript (ES modules), deployed to GitHub Pages under `/Portfolio/`.
- `src/components/` UI components, one component per file.
- `src/hooks/` reusable React hooks (`useSomething`).
- `src/lib/` framework-free logic: no JSX, no React imports. Pure functions and small modules.
- `src/data/` content only: plain objects and arrays, no logic.
- Styles live in `src/index.css`, organised by section with class-scoped selectors (never bare element selectors such as `header {}` that leak into other components).

## 1. Documentation

- Every exported function, component, hook and module gets a JSDoc block that says **what it does and why**, in plain English a new developer can follow.
- Document every parameter and return value: `@param {Type} name - meaning` and `@returns {Type} meaning`. For components, document each prop.
- Each file starts with a one or two line comment stating its responsibility.
- Comments explain *why*, not *what*. Do not narrate obvious code.
- Non-obvious numbers get a named constant (`const STEP_MS = 950`), never a bare magic number.

## 2. Readability

- Names say what a thing is or does: `askTwin`, `pipelineSteps`, `isRunning`. No `data2`, `tmp`, `handleIt`, single letters outside tiny loops.
- Functions do one thing. Soft limit **40 lines** per function; a function over **60 lines** must be split. No exceptions without a written reason in a comment.
- Components: soft limit **150 lines** per file. Extract sub-components and hooks before that.
- Files: soft limit **300 lines**. More files is better than one huge file.
- Max nesting depth of 3. Use early returns and guard clauses instead of deep `if` pyramids.
- Prefer clear code over clever code: no dense one-liners that need decoding.

## 3. Architecture and design

- **Single responsibility:** a module, hook or component has one reason to change.
- **Separation of concerns:** content in `data/`, logic in `lib/` or hooks, rendering in components. Components do not contain business logic beyond wiring.
- **Encapsulation:** modules export the smallest public API they need. Internal state stays private to its module (closures, non-exported helpers). Never reach into another module's internals or mutate its state from outside.
- **Abstraction must not leak:** callers use a module only through its exported functions. No importing private helpers, no depending on internal data shapes that are not documented as public.
- **Loose coupling:** components talk through props, hooks, or the documented event buses in `src/lib/`. No global variables, no `window.*` side channels.
- **DRY, but not prematurely:** extract shared code on the second real duplicate, not before.
- New dependencies need a clear reason; prefer the platform and existing libraries.

## 4. Correctness and reliability

- **No memory leaks.** Every `useEffect` that subscribes, listens, observes, starts a timer, interval, `requestAnimationFrame`, `fetch` or `AbortController` returns a cleanup that undoes it. Every `addEventListener` has a matching `removeEventListener`.
- No state updates after unmount: cancel timers and abort requests in cleanup.
- Handle failure paths: network calls have timeouts and a fallback; `localStorage`, clipboard and similar APIs are wrapped in `try/catch`.
- Validate and sanitise any external or user input before use. Never inject untrusted strings as HTML.
- No secrets or API keys in client code. Configuration comes from `import.meta.env.VITE_*`.
- Respect accessibility: real `<button>`/`<a>` elements, labels on inputs, `aria-label` on icon-only buttons, visible focus, `prefers-reduced-motion`.
- Keep it working on phones (375px wide) as well as desktop. No horizontal page scroll.

## 5. Style

- Match the surrounding code: 4-space indentation, single quotes, semicolons, function components with arrow functions.
- ESLint must pass with zero errors and zero warnings.

## Verification before every commit (mandatory)

Code must not be committed until it passes the standards review.

1. Run the `/code-standards` skill (`.claude/skills/code-standards/SKILL.md`). It reviews the staged changes against this file, runs lint and the build, and fixes violations.
2. Only when everything passes does it record approval for the exact staged snapshot.
3. A hook (`.claude/hooks/standards-gate.mjs`) blocks `git commit` unless that approval matches what is staged. Staging anything new after approval invalidates it, so re-run the review.

Never bypass the gate: do not delete the marker, edit the hook, use `--no-verify`, or commit through another tool to get around it.
