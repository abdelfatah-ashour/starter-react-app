import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { color } from "@/styles/tokens.stylex";
import { common } from "@/styles/common";

export const Dialog = DialogPrimitive.Root;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;
export const DialogClose = DialogPrimitive.Close;

const styles = stylex.create({
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 40,
    backgroundColor: color.scrim,
  },
  content: {
    position: "fixed",
    top: "50%",
    insetInlineStart: "50%",
    zIndex: 50,
    display: "flex",
    flexDirection: "column",
    maxHeight: "calc(100dvh - 48px)",
    width: "calc(100vw - 24px)",
    maxWidth: 420,
    transform: "translate(-50%, -50%)",
    overflowY: "auto",
    padding: 24,
  },
  close: {
    position: "absolute",
    top: 24,
    insetInlineEnd: 24,
    color: color.ink,
  },
  closeIcon: {
    width: 16,
    height: 16,
  },
});

/**
 * The open/close transitions live in `global.css`: they key off Radix's
 * `data-state` attribute, and StyleX styles cannot target arbitrary attributes.
 */
const Overlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>((props, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    data-pb-anim="overlay"
    {...props}
    {...stylex.props(styles.overlay)}
  />
));
Overlay.displayName = "DialogOverlay";

export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /** Renders a close button in the corner under this hook. */
  closeTestId?: string;
  sx?: stylex.StyleXStyles;
}

/**
 * Centred modal dialog. Radix supplies `role="dialog"`, focus trapping and
 * Escape-to-close; the acceptance contract depends on all three.
 */
export const ModalContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ children, closeTestId, sx, ...props }, ref) => {
  const { t } = useTranslation();
  return (
    <DialogPrimitive.Portal>
      <Overlay />
      <DialogPrimitive.Content
        ref={ref}
        aria-describedby={undefined}
        data-pb-anim="modal"
        {...props}
        {...stylex.props(common.card, styles.content, sx)}
      >
        {closeTestId ? (
          <DialogPrimitive.Close asChild>
            <Button
              variant="outline"
              size="icon"
              data-testid={closeTestId}
              sx={styles.close}
              aria-label={t("common.close")}
            >
              <X aria-hidden="true" {...stylex.props(styles.closeIcon)} />
            </Button>
          </DialogPrimitive.Close>
        ) : null}
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});
ModalContent.displayName = "ModalContent";
