import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { color } from "@/styles/tokens.stylex";
import { bp } from "@/styles/breakpoints.stylex";
import { leading } from "@/styles/type.stylex";

const styles = stylex.create({
  scroll: {
    position: "relative",
    width: "100%",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    minWidth: 640,
    textAlign: "start",
    fontSize: 14,
    lineHeight: leading.sm,
  },
  row: {
    borderWidth: 0,
    borderBottomWidth: { default: 1, ":last-child": 0 },
    borderStyle: "solid",
    borderColor: color.hairline,
  },
  headerCell: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: color.hairline,
    paddingInline: { default: 8, [bp.xl]: 12 },
    paddingBottom: 10,
    textAlign: "start",
    fontSize: 13,
    fontWeight: 400,
    color: color.inkMuted,
  },
  cell: {
    paddingInline: { default: 8, [bp.xl]: 12 },
    paddingBlock: 7,
    verticalAlign: "middle",
    color: color.inkSoft,
  },
});

interface Styled {
  sx?: stylex.StyleXStyles;
}

export function TableScroll({ sx, ...props }: React.HTMLAttributes<HTMLDivElement> & Styled) {
  return <div {...props} {...stylex.props(styles.scroll, sx)} />;
}

export function Table({ sx, ...props }: React.TableHTMLAttributes<HTMLTableElement> & Styled) {
  return <table {...props} {...stylex.props(styles.table, sx)} />;
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
  return <th scope="col" {...props} {...stylex.props(styles.headerCell, sx)} />;
}

export function TableCell({
  sx,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement> & Styled) {
  return <td {...props} {...stylex.props(styles.cell, sx)} />;
}
