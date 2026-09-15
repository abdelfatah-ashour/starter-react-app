import * as stylex from "@stylexjs/stylex";
import { Trans, useTranslation } from "react-i18next";
import { Dialog, DialogTitle, ModalContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { User } from "@/types";
import { Inline, Text } from "@/design/primitives";
import { fg } from "@/design/tokens/color.stylex";
import { space } from "@/design/tokens/space.stylex";
import { text } from "@/design/text";
import { weight } from "@/design/tokens/typography.stylex";

const styles = stylex.create({
  body: { marginTop: space[8] },
  name: { fontWeight: weight.semibold, color: fg.default },
  actions: { marginTop: space[24] },
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
          <DialogTitle {...stylex.props(text.titleXs)}>{t("users.confirm.title")}</DialogTitle>
          <Text leading="loose" tone="muted" sx={styles.body}>
            <Trans
              i18nKey="users.confirm.body"
              values={{ name: user.name }}
              components={[<span {...stylex.props(styles.name)} />]}
            />
          </Text>
          <Inline gap={10} justify="end" sx={styles.actions}>
            <Button variant="outline" data-testid="confirm-no" onClick={onCancel}>
              {t("common.cancel")}
            </Button>
            <Button variant="dangerSolid" data-testid="confirm-yes" onClick={onConfirm}>
              {t("users.confirm.confirm")}
            </Button>
          </Inline>
        </ModalContent>
      ) : null}
    </Dialog>
  );
}
