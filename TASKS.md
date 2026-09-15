# PulseBoard — build checklist

Stack: React 19 + TypeScript + Vite · StyleX · Recharts · Zod · Playwright
(Sections 0–13 record the original Tailwind/shadcn build; 14 replaced that styling layer, 15 built a design system on it.)

## 0. Tooling & stack setup
- [x] Install Tailwind CSS v4 + `@tailwindcss/vite`, wire into `vite.config.ts`
- [x] Add shadcn/ui foundations (`cn` util, CVA, clsx, tailwind-merge, lucide-react, Radix primitives)
- [x] Add design tokens (indigo primary, slate greys, status colours) as CSS variables
- [x] Install Recharts (chart) and Zod (validation)
- [x] Path alias `@/*` in `tsconfig` + `vite.config`
- [x] `npm run typecheck` clean

## 1. Shared foundations (reusable)
- [x] `lib/format.ts` — currency `$85,370`, percent `3.2%`, delta `+5.5%` / `-0.4%`, number, date
- [x] `lib/schemas.ts` — Zod schemas for `data.json` + user form
- [x] `hooks/useDashboardData` — fetch + Zod-parse `/data.json`, loading/error states
- [x] `hooks/useSortable` — generic column sort (asc → desc toggle)
- [x] `hooks/useTextFilter` — generic case-insensitive multi-field substring filter
- [x] `hooks/useUsers` — in-memory CRUD store (create/update/delete) surviving navigation
- [x] `hooks/useMediaQuery` — responsive helpers
- [x] shadcn primitives: Button, Card, Input, Label, Badge, Table, Dialog, Select
- [x] Shared UI: `StatusBadge`, `HealthBar`, `Avatar`, `DeltaIndicator`, `EmptyState`, `FieldGrid`, `SortableHeader`

## 2. App shell & navigation
- [x] `AppShell` with sticky top bar: logo mark + "PulseBoard" wordmark, period label right
- [x] Nav: `data-testid="nav-dashboard"` / `data-testid="nav-users"`, active pill styling
- [x] Page `<title>` and `<h1>` both contain "PulseBoard"
- [x] State lifted so Users edits survive Dashboard ↔ Users navigation
- [x] Zero `console.error` on load

## 3. Dashboard — KPI row
- [x] `data-testid="kpi-row"` wrapper, 4 × `data-testid="kpi-card"`
- [x] Label, formatted value per `format` (currency / number / percent / score)
- [x] Delta with ▲/▼ indicator, coloured by `higherIsBetter`, "vs last month"
- [x] Responsive: 4-up desktop → 2×2 tablet/mobile

## 4. Dashboard — Revenue chart
- [x] `data-testid="revenue-chart"` wrapper containing `<svg>`, with `aria-label`
- [x] Recharts composed chart: revenue bars + target line with dot markers
- [x] Title "Revenue vs target" + subtitle, legend (Revenue / Target)
- [x] Latest month bar highlighted in solid indigo
- [x] Y axis `$0`–`$100k` ticks, X axis short month labels

## 5. Dashboard — Accounts table
- [x] `data-testid="accounts-table"`, rows in `<tbody>` as `data-testid="account-row"` + `data-account-id`
- [x] Columns: Account, Plan, Region, Owner, MRR, Seats, Status, Health
- [x] `data-testid="cell-mrr"` per row, currency formatted, right-aligned
- [x] `data-testid="sort-mrr"` button — click 1 asc, click 2 desc; all headers sortable
- [x] `data-testid="table-filter"` input — name / owner / plan / region / status, case-insensitive
- [x] `data-testid="table-empty"` empty state, visible only when no matches
- [x] Status badge + health bar visuals, header "24 accounts" count
- [x] Horizontal scroll at mobile width

## 6. Dashboard — Detail drawer
- [x] `data-testid="detail-drawer"` with `role="dialog"`, slides in from right
- [x] Full record: name, plan, region, owner + email link, MRR, seats, status, health, signed up, last active, notes
- [x] `data-testid="drawer-close"` button + Escape closes
- [x] Selected row highlighted; full-width drawer on mobile

## 7. Users page — CRUD
- [x] `data-testid="users-page"`, visible only on Users route
- [x] `data-testid="users-table"` with `user-row` + `data-user-id`; Name/Email/Role/Team/Status/Last login
- [x] Avatar initials, status badge, `—` for null last login, "10 people" count
- [x] `data-testid="user-create"` "+ New user" button opens empty form
- [x] `data-testid="user-form"` in a centred modal, with `name`, `email`, `team` inputs + `<select name="role">`
- [x] `data-testid="user-save"` / `data-testid="user-cancel"`
- [x] `data-testid="user-edit"` per row opens pre-filled form; update in place
- [x] `data-testid="user-delete"` per row → `data-testid="confirm-delete"` (`role="dialog"`) with `confirm-yes` / `confirm-no`
- [x] Zod validation: name required, email shape → `data-testid="form-error"` inline, no save
- [x] New users default to `Invited`, no last login

## 8. Pixel fidelity & polish
- [x] Match `design/pulseboard-desktop-1280x800.png` (drawer open)
- [x] Match `design/pulseboard-desktop-no-drawer-1280x800.png`
- [x] Match `design/pulseboard-tablet-768x1024.png` (KPI 2×2)
- [x] Match `design/pulseboard-mobile-375x812.png`
- [x] Match `design/pulseboard-users-1280x800.png` and `-edit-` (error state)
- [x] Match `design/pulseboard-users-mobile-375x812.png`
- [x] Accessibility: focus rings, keyboard nav, aria labels, semantic table markup

## 9. Light & dark mode
- [x] `data-theme` on `<html>` re-binds every design token — no `dark:` utilities in components
- [x] Full dark palette: surfaces, hairlines, ink, brand, status, chart bars, target line, scrim
- [x] `hooks/useTheme` — system preference by default, explicit choice persisted to `localStorage`
- [x] Inline script in `index.html` resolves the theme before first paint (no flash)
- [x] `ThemeToggle` in the top bar with `aria-pressed` and a descriptive label
- [x] `color-scheme` set per theme so native controls and scrollbars follow
- [x] `tests/theme.spec.ts` — starts dark on an OS preference, toggles, survives reload, no console errors

## 10. Verification loop
- [x] `npm run typecheck` passes
- [x] `npm run build` passes
- [x] `npm test` — all acceptance tests green
- [x] `npm run screenshot` → compare against `design/`, iterate until matched
- [x] Final review of shared-component reuse (no duplicated table/drawer/badge logic)

## 11. Authentication
- [x] `.env` / `.env.example` hold `VITE_AUTH_USERNAME` / `VITE_AUTH_PASSWORD` (`root` / `root`)
- [x] `lib/env.ts` validates the env pair with Zod and fails loudly if absent
- [x] `LoginPage` — centred card, username + password, inline error, demo-credential hint
- [x] `useAuth` context: `signIn` / `signOut` / `isAuthenticated`, session in `localStorage`
- [x] App is gated: signed-out users only ever see the login screen
- [x] Sign-out control in the top bar
- [x] `tests/auth.spec.ts` — gate, wrong credentials, success, reload persistence, sign-out
- [x] Playwright seeds an authenticated session so `tests/acceptance.spec.ts` stays untouched
- [ ] NOTE: `VITE_*` values are inlined into the client bundle — demo gate, not real auth

## 12. Internationalisation
- [x] `i18next` + `react-i18next`, English source locale and French translation
- [x] `Translation` type makes every locale structurally match the English source
- [x] All interface strings translated: nav, KPIs, chart, tables, dialogs, forms, empty states, login
- [x] Zod validation messages carry i18n keys, resolved at render
- [x] Status and role labels translated; filtering and sorting still run on the raw data
- [x] Dates follow the active locale; currency stays en-US/USD (the data's currency)
- [x] `useLanguage` keeps `<html lang>`/`dir` in sync; choice persisted to `localStorage`
- [x] `LanguageToggle` in the top bar and on the login screen
- [x] Directional utilities use logical properties (`ms`/`me`/`ps`/`pe`/`start`/`end`)
- [x] `tests/i18n.spec.ts` — switching, persistence, translated form validation

## 13. Deployment
- [x] Vercel CLI authenticated (`abdelfatahashour4`), project linked as `pulseboard`
- [ ] Production deploy — blocked, `fetch failed` during upload; retry was interrupted
- [ ] Live URL verified

## 14. Styling: Tailwind + shadcn -> StyleX
- [x] `@stylexjs/stylex` + `@stylexjs/unplugin` wired into `vite.config.ts`
- [x] StyleX alias resolution (`unstable_moduleResolution` + `aliases`) so `@/…` imports of `*.stylex.ts` resolve
- [x] `styles/theme.css` — tokens as CSS custom properties, light and `[data-theme="dark"]`
- [x] `styles/tokens.stylex.ts` — typed StyleX handles (`color`, `font`, `radius`, `shadow`) onto those properties
- [x] `styles/breakpoints.stylex.ts` + `styles/type.stylex.ts` — shared media queries and line-height ratios via `defineConsts`
- [x] `styles/common.ts` — `srOnly`, `card`, `tabularNums` atoms
- [x] `styles/global.css` — element reset in a `reset` cascade layer declared before StyleX's layers
- [x] Every component restyled: `className`/`cn` replaced by `stylex.props`, overrides by an `sx` prop
- [x] Dropped `tailwindcss`, `@tailwindcss/vite`, `class-variance-authority`, `clsx`, `tailwind-merge`, `@radix-ui/react-label`, `@radix-ui/react-slot`
- [x] Kept `@radix-ui/react-dialog` — modal focus trap / Escape / `role="dialog"` are behaviour, not styling
- [x] Dialog enter/exit animations stay in `global.css`: they key off Radix `data-state`, which StyleX cannot target
- [x] Verified: 35/35 Playwright tests pass, 16/16 screenshots pixel-identical to the Tailwind build (bar a select-chevron centring fix)

## 15. Design system on StyleX
- [x] `src/design/` — tokens, type scale, surfaces, recipes, primitives, README
- [x] Semantic colour roles (`bg` / `fg` / `stroke` / `chart` / `meter`) over per-theme values in `theme.css`
- [x] Scales: space (px-keyed), radius, border, icon, control, font size, weight, tracking, leading, motion, z-index, grid track
- [x] `text.ts` — the type scale as whole styles, with `weights` / `leadings` / `tones` overrides
- [x] `recipe()` — typed variant composition, replacing hand-indexed style maps
- [x] Primitives: `Box`, `Stack`, `Inline`, `Grid`, `Text`, `VisuallyHidden`
- [x] Every component rebuilt on the system; no raw colour, size or weight literals left
- [x] Found and fixed: responsive `sx` overrides were dropping their base value (StyleX merges per property)
- [x] Found and fixed: breakpoints via `defineConsts` silently disabled StyleX's overlapping-media-query rewrite
- [x] Verified: 36/36 Playwright tests pass; computed styles identical at 1280 / 768 / 375; 15/16 screenshots pixel-identical
- [ ] NOTE: the delete-dialog title now takes the type scale's `-0.01em` tracking — the one intentional visual change
