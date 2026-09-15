import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export const Dialog = DialogPrimitive.Root;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;
export const DialogClose = DialogPrimitive.Close;

const Overlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-40 bg-scrim data-[state=open]:animate-[fade-in_150ms_ease-out] data-[state=closed]:animate-[fade-out_120ms_ease-in]",
      className,
    )}
    {...props}
  />
));
Overlay.displayName = "DialogOverlay";

export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /** Renders a close button in the corner under this hook. */
  closeTestId?: string;
}

/**
 * Centred modal dialog. Radix supplies `role="dialog"`, focus trapping and
 * Escape-to-close; the acceptance contract depends on all three.
 */
export const ModalContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ className, children, closeTestId, ...props }, ref) => {
  const { t } = useTranslation();
  return (
  <DialogPrimitive.Portal>
    <Overlay />
    <DialogPrimitive.Content
      ref={ref}
      aria-describedby={undefined}
      className={cn(
        "card fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100dvh-48px)] w-[calc(100vw-24px)] max-w-[420px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto p-6",
        "data-[state=open]:animate-[pop-in_170ms_cubic-bezier(0.32,0.72,0,1)] data-[state=closed]:animate-[pop-out_130ms_ease-in]",
        className,
      )}
      {...props}
    >
      {closeTestId ? (
        <DialogPrimitive.Close asChild>
          <Button
            variant="outline"
            size="icon"
            data-testid={closeTestId}
            className="absolute top-6 end-6 text-ink"
            aria-label={t("common.close")}
          >
            <X className="size-4" aria-hidden="true" />
          </Button>
        </DialogPrimitive.Close>
      ) : null}
      {children}
    </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});
ModalContent.displayName = "ModalContent";
