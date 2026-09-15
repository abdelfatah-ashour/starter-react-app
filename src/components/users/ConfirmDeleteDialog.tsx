import { Dialog, DialogTitle, ModalContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { User } from "@/types";

interface ConfirmDeleteDialogProps {
  user: User | null;
  onConfirm: () => void;
  onCancel: () => void;
}

/** In-app confirmation — deliberately not `window.confirm`. */
export function ConfirmDeleteDialog({ user, onConfirm, onCancel }: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={user !== null} onOpenChange={(open) => !open && onCancel()}>
      {user ? (
        <ModalContent data-testid="confirm-delete">
          <DialogTitle className="text-[17px] font-bold text-ink">Delete user?</DialogTitle>
          <p className="mt-2 text-sm leading-6 text-ink-soft">
            <span className="font-semibold text-ink">{user.name}</span> will lose access to
            PulseBoard. This cannot be undone.
          </p>
          <div className="mt-6 flex justify-end gap-2.5">
            <Button variant="outline" data-testid="confirm-no" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              data-testid="confirm-yes"
              onClick={onConfirm}
              className="bg-danger-solid text-white hover:bg-danger-solid/90"
            >
              Delete user
            </Button>
          </div>
        </ModalContent>
      ) : null}
    </Dialog>
  );
}
