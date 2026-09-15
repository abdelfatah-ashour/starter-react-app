# PulseBoard

React 19 + TypeScript + Vite. Playwright for tests.

- `npm run dev` — dev server on http://localhost:5173
- `npm test` — acceptance tests (starts the dev server if needed)
- `npm run typecheck` — tsc

## Styling

StyleX, with a design system on top in `src/design/` — read
`src/design/README.md` before styling anything.

- No raw values in components: no hex, no `14px`, no `600`. Import from
  `@/design/tokens/*`. If a value is missing, widen the scale.
- Layout is `Stack` / `Inline` / `Grid` / `Box`; text is `Text` with a `variant`
  from the type scale. Overrides go through an `sx` prop, applied last.
- Components with variants use `recipe()`; the type style goes first in `base`.
- Two StyleX traps documented in the README: styles merge per property (so a
  responsive override must restate its `default`), and media queries must be
  literal strings, never a shared constant.
- `src/design/global.css` is the only hand-written CSS — the element reset (in a
  `reset` cascade layer declared ahead of StyleX's) and the dialog animations,
  which key off Radix `data-state` attributes that StyleX cannot target.
