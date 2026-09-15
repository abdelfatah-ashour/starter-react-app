import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button, buttonIcon } from "@/components/ui/button";
import { bg, fg } from "@/design/tokens/color.stylex";
import { layer } from "@/design/tokens/layer.stylex";
import { space } from "@/design/tokens/space.stylex";
import { surface } from "@/design/surface";

export const Dialog = DialogPrimitive.Root;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;
export const DialogClose = DialogPrimitive.Close;

const styles = stylex.create({
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: layer.overlay,
    backgroundColor: bg.scrim,
  },
  content: {
    position: "fixed",
    top: "50%",
    insetInlineStart: "50%",
    zIndex: layer.modal,
    display: "flex",
    flexDirection: "column",
    /* Leaves a 24px margin at the top and bottom of the viewport. */
    maxHeight: "calc(100dvh - 48px)",
    width: "calc(100vw - 24px)",
    maxWidth: 420,
    transform: "translate(-50%, -50%)",
    overflowY: "auto",
    padding: space[24],
  },
  close: {
    position: "absolute",
    top: space[24],
    insetInlineEnd: space[24],
    color: fg.default,
  },
});

/**
 * The open/close transitions live in `design/global.css`: they key off Radix's
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
        {...stylex.props(surface.card, styles.content, sx)}
      >
        {closeTestId ? (
          <DialogPrimitive.Close asChild>
            <Button
              variant="outline"
              size="square"
              data-testid={closeTestId}
              sx={styles.close}
              aria-label={t("common.close")}
            >
              <X aria-hidden="true" {...stylex.props(buttonIcon.sm)} />
            </Button>
          </DialogPrimitive.Close>
        ) : null}
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});
ModalContent.displayName = "ModalContent";
