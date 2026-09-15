import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { Dialog, DialogTitle, ModalContent } from "@/components/ui/dialog";
import { Field, FieldGrid } from "@/components/shared/FieldGrid";
import { HealthBar } from "@/components/shared/HealthBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatDate, formatNumber } from "@/lib/format";
import type { Account } from "@/types";
import { color } from "@/styles/tokens.stylex";
import { bp } from "@/styles/breakpoints.stylex";
import { leading } from "@/styles/type.stylex";

const styles = stylex.create({
  content: {
    maxWidth: 560,
    padding: 28,
  },
  eyebrow: {
    fontSize: 14,
    lineHeight: leading.sm,
    color: color.inkMuted,
  },
  title: {
    marginTop: 2,
    marginBottom: 28,
    paddingInlineEnd: 48,
    fontSize: 24,
    lineHeight: "32px",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: color.ink,
  },
  grid: {
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [bp.sm]: "repeat(4, minmax(0, 1fr))",
    },
  },
  list: {
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  term: { fontSize: 13, color: color.inkMuted },
  value: { marginTop: 4, fontSize: 15, fontWeight: 600, color: color.ink },
  emailRow: { marginTop: 2 },
  email: {
    fontSize: 15,
    fontWeight: 500,
    textDecorationLine: "underline",
    textUnderlineOffset: 2,
    color: { default: color.brand600, ":hover": color.brand700 },
  },
  notes: { marginTop: 4, fontSize: 15, lineHeight: "24px", color: color.ink },
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
          <p {...stylex.props(styles.eyebrow)}>{t("accounts.detail.eyebrow")}</p>
          <DialogTitle {...stylex.props(styles.title)}>{account.name}</DialogTitle>

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

          <dl {...stylex.props(styles.list)}>
            <div>
              <dt {...stylex.props(styles.term)}>{t("accounts.detail.owner")}</dt>
              <dd {...stylex.props(styles.value)}>{account.owner}</dd>
              <dd {...stylex.props(styles.emailRow)}>
                <a href={`mailto:${account.ownerEmail}`} {...stylex.props(styles.email)}>
                  {account.ownerEmail}
                </a>
              </dd>
            </div>
            <div>
              <dt {...stylex.props(styles.term)}>{t("accounts.detail.notes")}</dt>
              <dd {...stylex.props(styles.notes)}>{account.notes}</dd>
            </div>
          </dl>
        </ModalContent>
      ) : null}
    </Dialog>
  );
}
