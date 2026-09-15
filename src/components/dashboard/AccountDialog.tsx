import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { Dialog, DialogTitle, ModalContent } from "@/components/ui/dialog";
import { Field, FieldGrid } from "@/components/shared/FieldGrid";
import { HealthBar } from "@/components/shared/HealthBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatDate, formatNumber } from "@/lib/format";
import type { Account } from "@/types";
import { Box, Stack, Text } from "@/design/primitives";
import { fg } from "@/design/tokens/color.stylex";
import { space } from "@/design/tokens/space.stylex";
import { track } from "@/design/tokens/grid.stylex";
import { text, weights } from "@/design/text";

const styles = stylex.create({
  content: {
    maxWidth: 560,
    padding: space[28],
  },
  title: {
    marginTop: space[2],
    marginBottom: space[28],
    /* Clears the close button in the corner. */
    paddingInlineEnd: space[48],
  },
  /* Restates the default: StyleX merges one property at a time, so an override
     with no default would drop FieldGrid's own two-column value. */
  grid: {
    gridTemplateColumns: { default: track[2], ["@media (min-width: 640px)"]: track[4] },
  },
  list: { marginTop: space[24] },
  value: { marginTop: space[4] },
  emailRow: { marginTop: space[2] },
  email: {
    textDecorationLine: "underline",
    textUnderlineOffset: 2,
    color: { default: fg.accent, ":hover": fg.accentStrong },
  },
});

interface AccountDialogProps {
  account: Account | null;
  onClose: () => void;
}

/**
 * Full account record in a centred modal. The `detail-drawer` / `drawer-close`
 * hooks are fixed by the acceptance contract and kept as-is.
 */
export function AccountDialog({ account, onClose }: AccountDialogProps) {
  const { t } = useTranslation();
  return (
    <Dialog open={account !== null} onOpenChange={(open) => !open && onClose()}>
      {account ? (
        <ModalContent data-testid="detail-drawer" closeTestId="drawer-close" sx={styles.content}>
          <Text tone="subtle">{t("accounts.detail.eyebrow")}</Text>
          <DialogTitle {...stylex.props(text.titleLg, styles.title)}>{account.name}</DialogTitle>

          <FieldGrid sx={styles.grid}>
            <Field label={t("accounts.columns.plan")}>{account.plan}</Field>
            <Field label={t("accounts.columns.region")}>{account.region}</Field>
            <Field label={t("accounts.columns.mrr")}>{formatCurrency(account.mrr)}</Field>
            <Field label={t("accounts.columns.seats")}>{formatNumber(account.seats)}</Field>
            <Field label={t("accounts.columns.status")}>
              <StatusBadge status={account.status} />
            </Field>
            <Field label={t("accounts.columns.health")}>
              <HealthBar score={account.health} />
            </Field>
            <Field label={t("accounts.detail.signedUp")}>{formatDate(account.signedUpAt)}</Field>
            <Field label={t("accounts.detail.lastActive")}>{formatDate(account.lastActiveAt)}</Field>
          </FieldGrid>

          <Stack as="dl" gap={20} sx={styles.list}>
            <Box>
              <Text as="dt" variant="bodySm" tone="subtle">
                {t("accounts.detail.owner")}
              </Text>
              <Text as="dd" variant="bodyLg" weight="semibold" tone="default" sx={styles.value}>
                {account.owner}
              </Text>
              <Box as="dd" sx={styles.emailRow}>
                <a
                  href={`mailto:${account.ownerEmail}`}
                  {...stylex.props(text.bodyLg, weights.medium, styles.email)}
                >
                  {account.ownerEmail}
                </a>
              </Box>
            </Box>
            <Box>
              <Text as="dt" variant="bodySm" tone="subtle">
                {t("accounts.detail.notes")}
              </Text>
              <Text as="dd" variant="bodyLg" leading="relaxed" tone="default" sx={styles.value}>
                {account.notes}
              </Text>
            </Box>
          </Stack>
        </ModalContent>
      ) : null}
    </Dialog>
  );
}
