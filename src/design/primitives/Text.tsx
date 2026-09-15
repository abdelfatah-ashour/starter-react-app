import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import {
  leadings,
  text,
  tones,
  weights,
  type TextLeading,
  type TextTone,
  type TextVariant,
  type TextWeight,
} from "@/design/text";

const styles = stylex.create({
  nowrap: { whiteSpace: "nowrap" },
  numeric: { fontVariantNumeric: "tabular-nums" },
  breakWords: { overflowWrap: "break-word" },
});

const alignments = stylex.create({
  start: { textAlign: "start" },
  center: { textAlign: "center" },
  end: { textAlign: "end" },
});

export type TextAlign = keyof typeof alignments;

export type TextElement =
  | "p"
  | "span"
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "dt"
  | "dd"
  | "figcaption"
  | "legend"
  | "caption"
  | "time";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** Defaults to `p`. Pick the element the document needs; `variant` carries the look. */
  as?: TextElement;
  /** A style from the type scale. Defaults to `body`. */
  variant?: TextVariant;
  /** Overrides the variant's weight. */
  weight?: TextWeight;
  /** Overrides the variant's line height. */
  leading?: TextLeading;
  /** Defaults to `inherit`, so text takes its colour from context. */
  tone?: TextTone;
  align?: TextAlign;
  nowrap?: boolean;
  /** Fixed-width digits, so columns of numbers line up. */
  numeric?: boolean;
  /** Lets a long unbroken string wrap rather than overflow. */
  breakWords?: boolean;
  sx?: stylex.StyleXStyles;
}

/**
 * Every piece of text in the app. The element and the look are separate props,
 * so a visually small heading is still an `h2` in the document.
 */
export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      as: As = "p",
      variant = "body",
      weight,
      leading,
      tone = "inherit",
      align,
      nowrap,
      numeric,
      breakWords,
      sx,
      ...props
    },
    ref,
  ) => {
    const Component = As as React.ElementType;
    return (
      <Component
        ref={ref}
        {...props}
        {...stylex.props(
          text[variant],
          weight && weights[weight],
          leading && leadings[leading],
          tones[tone],
          align && alignments[align],
          nowrap && styles.nowrap,
          numeric && styles.numeric,
          breakWords && styles.breakWords,
          sx,
        )}
      />
    );
  },
);
Text.displayName = "Text";
