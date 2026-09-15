# PulseBoard design system

A thin layer over [StyleX](https://stylexjs.com). StyleX stays the styling
engine — this adds the vocabulary: what the colours are called, what the spacing
steps are, what the type scale is, and a handful of components so a layout is
described rather than re-derived.

```
design/
  theme.css          token values, light and dark
  global.css         element reset + dialog animations (the only hand-written CSS)
  tokens/            typed handles for every value
  text.ts            the type scale, as whole styles
  surface.ts         panel treatments
  responsive.ts      breakpoints and the shared page gutter
  recipe.ts          variant composition
  primitives/        Box, Stack, Inline, Grid, Text, VisuallyHidden
```

Import from the barrel (`@/design`) or the specific module; both work, and the
specific module keeps the dependency obvious.

## Rules

**Never write a raw value.** No hex, no `14px`, no `600`. If a value is missing
from a scale, widen the scale — that decision belongs in `tokens/`, where the
next person will find it.

**Name the role, not the colour.** `fg.muted`, not "slate 600". A component
never mentions light or dark; re-binding the custom properties in `theme.css`
does that.

**Pick a whole type style.** `text.body`, not a size plus a line height. Sizes
and line heights that travel separately are how a scale drifts.

## Tokens

| Module | Exports | Notes |
| --- | --- | --- |
| `tokens/color.stylex` | `bg` `fg` `stroke` `chart` `meter` | semantic roles |
| `tokens/elevation.stylex` | `shadow` | `card` `raised` `popover` |
| `tokens/space.stylex` | `space` | keyed by pixels: `space[12]` is 12px |
| `tokens/shape.stylex` | `radius` `border` | |
| `tokens/size.stylex` | `icon` `control` | icon boxes, control heights |
| `tokens/typography.stylex` | `family` `size` `weight` `tracking` `leading` | |
| `tokens/grid.stylex` | `track` | `repeat(n, minmax(0, 1fr))` |
| `tokens/motion.stylex` | `duration` `easing` | |
| `tokens/layer.stylex` | `layer` | every `zIndex` in the app |

Colour and elevation are `defineVars`, because they change with the theme.
Everything else is `defineConsts` and inlines at build time.

Values live in `theme.css` as custom properties rather than in the StyleX
variable definitions, because the theme is an attribute on `<html>` set before
first paint, and StyleX cannot emit variable overrides behind an arbitrary
selector. See the note at the top of that file.

## Primitives

```tsx
<Stack gap={16}>                      column, 16px apart
<Inline gap={8} justify="between">    row, vertically centred by default
<Grid columns={2} gap={12}>           equal columns
<Box as="section" sx={styles.panel}>  escape hatch — any element, any styles
<Text variant="bodySm" tone="subtle"> the element and the look are separate props
<VisuallyHidden as="h2">              structure for screen readers
```

`gap` takes a number from the spacing scale. `Text` takes `variant`, plus
`weight`, `leading`, `tone`, `align`, `nowrap`, `numeric` and `breakWords` as
overrides — `as` picks the element the document needs, independently of how it
looks.

Every primitive accepts `sx`, applied last. That is the whole precedence story:
no specificity to reason about, later wins.

## Variants

`recipe()` composes a base with named variant groups and gives a component its
prop types from one source:

```tsx
const badge = recipe({
  base: [text.label, styles.base],
  variants: { tone: { good: styles.good, bad: styles.bad } },
  defaults: { tone: "neutral" },
});

export interface BadgeProps extends VariantProps<typeof badge.variants> {}

<span {...stylex.props(...badge({ tone }), sx)} />
```

Put the type style **first** in `base`, under the component's own rules —
otherwise it overrides the weight the component just set.

## Two StyleX behaviours worth knowing

Both cost real debugging time on this codebase.

**Styles merge one property at a time.** A later style that sets a property
conditionally replaces the earlier value *including at `default`*. So a
responsive override has to restate its default:

```tsx
// wrong — below 640px this has no columns at all
<Grid columns={2} sx={{ gridTemplateColumns: { default: null, [SM]: track[4] } }} />

// right
gridTemplateColumns: { default: track[2], [SM]: track[4] }
```

`{ default: null, ":hover": … }` is fine — that is a pseudo-class on a property
nothing else sets.

**Media queries must be literal strings**, never a shared constant. StyleX
rewrites overlapping queries so the widest wins, and that rewrite only fires on
keys it can see start with `@media `. Route one through `defineConsts` and it
silently stops, leaving the winner to emission order. `responsive.ts` has the
breakpoint values and the longer explanation.

## Boundaries

The reset and the dialog enter/exit animations stay in `global.css`. The
animations key off Radix's `data-state` attribute, and StyleX styles support
pseudo-classes and media queries but not arbitrary attribute selectors.

The reset sits in a `reset` cascade layer, declared ahead of StyleX's layers in
`vite.config.ts`. Without that, its bare element selectors would outrank every
StyleX style, because unlayered CSS beats layered CSS however specific the
layered rule is.

A one-off dimension that is nobody else's business — a chart's 280px height, a
table's 640px minimum — stays a literal in the component, with a comment. The
scales are for values that repeat.
