import type * as stylex from "@stylexjs/stylex";

type Style = stylex.StyleXStyles;
type VariantGroups = Record<string, Record<string, Style>>;

/** The props a recipe accepts: one optional key per variant group. */
export type VariantProps<V extends VariantGroups> = {
  [K in keyof V]?: keyof V[K] & string;
};

interface RecipeConfig<V extends VariantGroups> {
  /** Applied first, under every variant. */
  base?: Style;
  variants: V;
  /** Used for any group the caller leaves undefined. */
  defaults?: VariantProps<V>;
}

/**
 * Builds a component's style set out of a base plus named variant groups, so a
 * component declares what it varies by instead of hand-indexing style maps.
 *
 *     const button = recipe({
 *       base: styles.base,
 *       variants: { tone: { primary: styles.primary }, size: { md: styles.md } },
 *       defaults: { tone: "primary", size: "md" },
 *     });
 *
 *     <button {...stylex.props(...button({ tone, size }), sx)} />
 *
 * `VariantProps<typeof button.variants>` gives the component its prop types, so
 * the variant names are typed from one source.
 *
 * Groups apply in declaration order and the caller's `sx` goes last, which is
 * the whole precedence story — there is no specificity to reason about.
 */
export function recipe<V extends VariantGroups>(config: RecipeConfig<V>) {
  const { base, variants, defaults } = config;
  const groups = Object.keys(variants) as (keyof V)[];

  const build = (props: VariantProps<V> = {}): Style[] => {
    const out: Style[] = [];
    if (base) out.push(base);
    for (const group of groups) {
      const chosen = props[group] ?? defaults?.[group];
      if (chosen === undefined) continue;
      const style = variants[group][chosen];
      if (style) out.push(style);
    }
    return out;
  };

  /** Exposed so a component can derive its prop types: `VariantProps<typeof x.variants>`. */
  build.variants = variants;
  return build;
}
