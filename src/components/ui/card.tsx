import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { color } from "@/styles/tokens.stylex";
import { common } from "@/styles/common";

const styles = stylex.create({
  header: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    paddingInline: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 15,
    lineHeight: "20px",
    fontWeight: 700,
    color: color.ink,
  },
  description: {
    marginTop: 2,
    fontSize: 13,
    color: color.inkMuted,
  },
  content: {
    paddingInline: 20,
    paddingBottom: 20,
  },
});

interface Styled {
  sx?: stylex.StyleXStyles;
}

export function Card({ sx, ...props }: React.HTMLAttributes<HTMLDivElement> & Styled) {
  return <div {...props} {...stylex.props(common.card, sx)} />;
}

export function CardHeader({ sx, ...props }: React.HTMLAttributes<HTMLDivElement> & Styled) {
  return <div {...props} {...stylex.props(styles.header, sx)} />;
}

export function CardTitle({ sx, ...props }: React.HTMLAttributes<HTMLHeadingElement> & Styled) {
  return <h2 {...props} {...stylex.props(styles.title, sx)} />;
}

export function CardDescription({
  sx,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & Styled) {
  return <p {...props} {...stylex.props(styles.description, sx)} />;
}

export function CardContent({ sx, ...props }: React.HTMLAttributes<HTMLDivElement> & Styled) {
  return <div {...props} {...stylex.props(styles.content, sx)} />;
}
