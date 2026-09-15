import { Badge } from "@/components/ui/badge";
import type { AccountStatus, UserStatus } from "@/types";

type Status = AccountStatus | UserStatus;

const TONES: Record<Status, "good" | "warn" | "bad" | "brand" | "neutral"> = {
  Active: "good",
  Trial: "brand",
  "At risk": "warn",
  Churned: "neutral",
  Invited: "brand",
  Suspended: "bad",
};

/** One badge shared by the accounts table, the account dialog and the users table. */
export function StatusBadge({ status }: { status: Status }) {
  return <Badge tone={TONES[status]}>{status}</Badge>;
}
