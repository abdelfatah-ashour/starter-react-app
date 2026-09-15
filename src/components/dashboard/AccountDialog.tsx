import { Dialog, DialogTitle, ModalContent } from "@/components/ui/dialog";
import { Field, FieldGrid } from "@/components/shared/FieldGrid";
import { HealthBar } from "@/components/shared/HealthBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatDate, formatNumber } from "@/lib/format";
import type { Account } from "@/types";

interface AccountDialogProps {
  account: Account | null;
  onClose: () => void;
}

/**
 * Full account record in a centred modal. The `detail-drawer` / `drawer-close`
 * hooks are fixed by the acceptance contract and kept as-is.
 */
export function AccountDialog({ account, onClose }: AccountDialogProps) {
  return (
    <Dialog open={account !== null} onOpenChange={(open) => !open && onClose()}>
      {account ? (
        <ModalContent
          data-testid="detail-drawer"
          closeTestId="drawer-close"
          className="max-w-[560px] p-7"
        >
          <p className="text-sm text-ink-muted">Account</p>
          <DialogTitle className="mt-0.5 mb-7 pr-12 text-2xl leading-8 font-bold tracking-[-0.02em] text-ink">
            {account.name}
          </DialogTitle>

          <FieldGrid className="sm:grid-cols-4">
            <Field label="Plan">{account.plan}</Field>
            <Field label="Region">{account.region}</Field>
            <Field label="MRR">{formatCurrency(account.mrr)}</Field>
            <Field label="Seats">{formatNumber(account.seats)}</Field>
            <Field label="Status">
              <StatusBadge status={account.status} />
            </Field>
            <Field label="Health">
              <HealthBar score={account.health} />
            </Field>
            <Field label="Signed up">{formatDate(account.signedUpAt)}</Field>
            <Field label="Last active">{formatDate(account.lastActiveAt)}</Field>
          </FieldGrid>

          <dl className="mt-6 space-y-5">
            <div>
              <dt className="text-[13px] text-ink-muted">Owner</dt>
              <dd className="mt-1 text-[15px] font-semibold text-ink">{account.owner}</dd>
              <dd className="mt-0.5">
                <a
                  href={`mailto:${account.ownerEmail}`}
                  className="text-[15px] font-medium text-brand-600 underline underline-offset-2 hover:text-brand-700"
                >
                  {account.ownerEmail}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[13px] text-ink-muted">Notes</dt>
              <dd className="mt-1 text-[15px] leading-6 text-ink">{account.notes}</dd>
            </div>
          </dl>
        </ModalContent>
      ) : null}
    </Dialog>
  );
}
