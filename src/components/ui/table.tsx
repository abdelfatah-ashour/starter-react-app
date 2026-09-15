import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { fg, stroke } from "@/design/tokens/color.stylex";
import { border } from "@/design/tokens/shape.stylex";
import { space } from "@/design/tokens/space.stylex";
import { leadings, text } from "@/design/text";
import { weight } from "@/design/tokens/typography.stylex";

const styles = stylex.create({
  scroll: {
    position: "relative",
    width: "100%",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    /* Below this the columns stop being readable, so the wrapper scrolls instead. */
    minWidth: 640,
    textAlign: "start",
  },
  row: {
    borderWidth: border.none,
    borderBottomWidth: { default: border.thin, ":last-child": border.none },
    borderStyle: "solid",
    borderColor: stroke.default,
  },
  headerCell: {
    borderWidth: border.none,
    borderBottomWidth: border.thin,
    borderStyle: "solid",
    borderColor: stroke.default,
    paddingInline: { default: space[8], ["@media (min-width: 1280px)"]: space[12] },
    paddingBottom: space[10],
    textAlign: "start",
    fontWeight: weight.regular,
    color: fg.subtle,
  },
  cell: {
    paddingInline: { default: space[8], ["@media (min-width: 1280px)"]: space[12] },
    /* Half of the 14px row rhythm; not a step on the spacing scale. */
    paddingBlock: 7,
    verticalAlign: "middle",
    color: fg.muted,
  },
});

interface Styled {
  sx?: stylex.StyleXStyles;
}

/** Lets a wide table scroll sideways instead of forcing the page to. */
export function TableScroll({ sx, ...props }: React.HTMLAttributes<HTMLDivElement> & Styled) {
  return <div {...props} {...stylex.props(styles.scroll, sx)} />;
}

export function Table({ sx, ...props }: React.TableHTMLAttributes<HTMLTableElement> & Styled) {
  return <table {...props} {...stylex.props(text.body, styles.table, sx)} />;
}

export function TableHead(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props} />;
}

export function TableBody(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />;
}

export function TableRow({ sx, ...props }: React.HTMLAttributes<HTMLTableRowElement> & Styled) {
  return <tr {...props} {...stylex.props(styles.row, sx)} />;
}

export function TableHeaderCell({
  sx,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement> & Styled) {
  return <th scope="col" {...props} {...stylex.props(text.bodySm, leadings.inherit, styles.headerCell, sx)} />;
}

export function TableCell({
  sx,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement> & Styled) {
  return <td {...props} {...stylex.props(styles.cell, sx)} />;
}
