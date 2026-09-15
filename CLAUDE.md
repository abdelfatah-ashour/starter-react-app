# PulseBoard

React 19 + TypeScript + Vite. Playwright for tests.

- `npm run dev` — dev server on http://localhost:5173
- `npm test` — acceptance tests (starts the dev server if needed)
- `npm run typecheck` — tsc

## Styling

StyleX. No Tailwind, no `className` strings, no `cn()`.

- Tokens: `src/styles/theme.css` holds the raw values as CSS custom properties,
  light and dark. `src/styles/tokens.stylex.ts` exposes them as typed StyleX
  variables — import `color`, `font`, `radius`, `shadow` from there, never a
  literal hex.
- Dark mode is `[data-theme]` on `<html>`, set before first paint by the inline
  script in `index.html`. Components never reference the theme; re-binding the
  custom properties does the work.
- Shared bits: `styles/breakpoints.stylex.ts` (`bp.sm`/`bp.lg`/`bp.xl`),
  `styles/type.stylex.ts` (`leading.*`), `styles/common.ts` (`srOnly`, `card`,
  `tabularNums`).
- A component that takes style overrides does it with an `sx?: stylex.StyleXStyles`
  prop applied last: `{...stylex.props(styles.base, sx)}`.
- `src/styles/global.css` is the only hand-written CSS: the element reset (in the
  `reset` cascade layer, which `vite.config.ts` declares ahead of StyleX's layers
  so component styles win) and the dialog animations, which key off Radix's
  `data-state` attribute — StyleX handles pseudo-classes and media queries, but
  not arbitrary attribute selectors.
