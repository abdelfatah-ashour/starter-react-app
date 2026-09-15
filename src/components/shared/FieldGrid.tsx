import type { ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";
import { Box, Grid, Text } from "@/design/primitives";
import { space } from "@/design/tokens/space.stylex";
import { track } from "@/design/tokens/grid.stylex";

const styles = stylex.create({
  field: { minWidth: 0 },
  value: { marginTop: space[4] },
  grid: { gridTemplateColumns: track[2], columnGap: space[24], rowGap: space[20] },
});

/** Label-over-value pair used throughout the account dialog. */
export function Field({
  label,
  children,
  sx,
}: {
  label: string;
  children: ReactNode;
  sx?: stylex.StyleXStyles;
}) {
  return (
    <Box sx={[styles.field, sx]}>
      <Text as="dt" variant="bodySm" tone="subtle">
        {label}
      </Text>
      <Text as="dd" variant="bodyLg" weight="semibold" tone="default" breakWords sx={styles.value}>
        {children}
      </Text>
    </Box>
  );
}

export function FieldGrid({ children, sx }: { children: ReactNode; sx?: stylex.StyleXStyles }) {
  return (
    <Grid as="dl" sx={[styles.grid, sx]}>
      {children}
    </Grid>
  );
}
