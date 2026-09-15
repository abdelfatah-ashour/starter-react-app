import { Stack, Text } from "@/design/primitives";
import * as stylex from "@stylexjs/stylex";
import { space } from "@/design/tokens/space.stylex";

const styles = stylex.create({
  wrapper: {
    paddingInline: space[16],
    paddingBlock: space[56],
  },
});

interface EmptyStateProps {
  title: string;
  description?: string;
  "data-testid"?: string;
}

/** Shown in place of table rows when a filter matches nothing. */
export function EmptyState({ title, description, ...props }: EmptyStateProps) {
  return (
    <Stack align="center" justify="center" gap={4} {...props} sx={styles.wrapper}>
      <Text variant="body" weight="semibold" tone="default" align="center">
        {title}
      </Text>
      {description ? (
        <Text variant="bodySm" tone="subtle" align="center">
          {description}
        </Text>
      ) : null}
    </Stack>
  );
}
