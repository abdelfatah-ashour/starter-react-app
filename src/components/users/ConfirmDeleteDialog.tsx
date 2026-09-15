import * as stylex from "@stylexjs/stylex";
import { Trans, useTranslation } from "react-i18next";
import { Dialog, DialogTitle, ModalContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { User } from "@/types";
import { color } from "@/styles/tokens.stylex";

const styles = stylex.create({
  title: { fontSize: 17, fontWeight: 700, color: color.ink },
  body: { marginTop: 8, fontSize: 14, lineHeight: "24px", color: color.inkSoft },
  name: { fontWeight: 600, color: color.ink },
  actions: {
    marginTop: 24,
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
  },
});

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
          <DialogTitle {...stylex.props(styles.title)}>{t("users.confirm.title")}</DialogTitle>
          <p {...stylex.props(styles.body)}>
            <Trans
              i18nKey="users.confirm.body"
              values={{ name: user.name }}
              components={[<span {...stylex.props(styles.name)} />]}
            />
          </p>
          <div {...stylex.props(styles.actions)}>
            <Button variant="outline" data-testid="confirm-no" onClick={onCancel}>
              {t("common.cancel")}
            </Button>
            <Button variant="dangerSolid" data-testid="confirm-yes" onClick={onConfirm}>
              {t("users.confirm.confirm")}
            </Button>
          </div>
        </ModalContent>
      ) : null}
    </Dialog>
  );
}
