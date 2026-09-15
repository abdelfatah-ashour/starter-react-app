import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { Box, Inline, Text } from "@/design/primitives";
import { space } from "@/design/tokens/space.stylex";
import { surface } from "@/design/surface";

const styles = stylex.create({
  header: {
    paddingInline: space[20],
    paddingTop: space[20],
  },
  description: {
    marginTop: space[2],
  },
  content: {
    paddingInline: space[20],
    paddingBottom: space[20],
  },
});

interface Styled {
  sx?: stylex.StyleXStyles;
}

/** A panel on the canvas. */
export function Card({ sx, ...props }: React.HTMLAttributes<HTMLDivElement> & Styled) {
  return <Box {...props} sx={[surface.card, sx]} />;
}

/** Title and description on the left, actions on the right, wrapping when tight. */
export function CardHeader({ sx, ...props }: React.HTMLAttributes<HTMLDivElement> & Styled) {
  return <Inline wrap align="start" justify="between" gap={12} {...props} sx={[styles.header, sx]} />;
}

export function CardTitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <Text as="h2" variant="heading" tone="default" {...props} />;
}

export function CardDescription(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <Text variant="bodySm" tone="subtle" sx={styles.description} {...props} />;
}

export function CardContent({ sx, ...props }: React.HTMLAttributes<HTMLDivElement> & Styled) {
  return <Box {...props} sx={[styles.content, sx]} />;
}
