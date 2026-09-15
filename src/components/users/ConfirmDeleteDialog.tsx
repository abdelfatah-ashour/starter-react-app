import { Dialog, DialogTitle, ModalContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { User } from "@/types";
import { Trans, useTranslation } from "react-i18next";

interface ConfirmDeleteDialogProps {
  user: User | null;
  onConfirm: () => void;
  onCancel: () => void;
}

/** In-app confirmation — deliberately not `window.confirm`. */
export function ConfirmDeleteDialog({ user, onConfirm, onCancel }: ConfirmDeleteDialogProps) {
  const { t } = useTranslation();
  return (
    <Dialog open={user !== null} onOpenChange={(open) => !open && onCancel()}>
      {user ? (
        <ModalContent data-testid="confirm-delete">
          <DialogTitle className="text-[17px] font-bold text-ink">{t("users.confirm.title")}</DialogTitle>
          <p className="mt-2 text-sm leading-6 text-ink-soft">
            <Trans
              i18nKey="users.confirm.body"
              values={{ name: user.name }}
              components={[<span className="font-semibold text-ink" />]}
            />
          </p>
          <div className="mt-6 flex justify-end gap-2.5">
            <Button variant="outline" data-testid="confirm-no" onClick={onCancel}>
              {t("common.cancel")}
            </Button>
            <Button
              data-testid="confirm-yes"
              onClick={onConfirm}
              className="bg-danger-solid text-white hover:bg-danger-solid/90"
            >
              {t("users.confirm.confirm")}
            </Button>
          </div>
        </ModalContent>
      ) : null}
    </Dialog>
  );
}
