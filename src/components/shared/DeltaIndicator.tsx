import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { formatDelta } from "@/lib/format";
import { Inline, Text, VisuallyHidden } from "@/design/primitives";
import { fg } from "@/design/tokens/color.stylex";
import { space } from "@/design/tokens/space.stylex";
import { weight } from "@/design/tokens/typography.stylex";
import { text } from "@/design/text";

const styles = stylex.create({
  /* Column gap only: when this wraps, the two lines should sit tight. */
  row: { columnGap: space[6] },
  change: { fontWeight: weight.semibold },
  good: { color: fg.success },
  bad: { color: fg.danger },
  arrow: { flexShrink: 0 },
});

interface DeltaIndicatorProps {
  delta: number;
  /** Whether an increase is good news (revenue) or bad news (churn). */
  higherIsBetter: boolean;
  caption?: string;
}

/** Direction triangle + signed percent, coloured by whether the move is good. */
export function DeltaIndicator({ delta, higherIsBetter, caption }: DeltaIndicatorProps) {
  const { t } = useTranslation();
  const rising = delta >= 0;
  const good = rising === higherIsBetter;

  return (
    <Inline as="p" wrap sx={[text.bodySm, styles.row]}>
      <Inline as="span" gap={4} sx={[styles.change, good ? styles.good : styles.bad]}>
        <svg
          width="9"
          height="8"
          viewBox="0 0 9 8"
          aria-hidden="true"
          {...stylex.props(styles.arrow)}
        >
          <path d={rising ? "M4.5 0 9 8H0z" : "M4.5 8 0 0h9z"} fill="currentColor" />
        </svg>
        <Text as="span" variant="bodySm" weight="semibold" numeric>
          {formatDelta(delta)}
        </Text>
        <VisuallyHidden>{good ? t("kpi.improving") : t("kpi.worsening")}</VisuallyHidden>
      </Inline>
      {caption ? (
        <Text as="span" variant="bodySm" tone="subtle" nowrap>
          {caption}
        </Text>
      ) : null}
    </Inline>
  );
}
