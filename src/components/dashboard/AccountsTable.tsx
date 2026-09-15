import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableScroll,
} from "@/components/ui/table";
import { EmptyState } from "@/components/shared/EmptyState";
import { HealthBar } from "@/components/shared/HealthBar";
import { SortableHeader } from "@/components/shared/SortableHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useSortable } from "@/hooks/useSortable";
import { useTextFilter } from "@/hooks/useTextFilter";
import { formatCurrency, formatNumber } from "@/lib/format";
import type { Account } from "@/types";

type ColumnKey = "name" | "plan" | "region" | "owner" | "mrr" | "seats" | "status" | "health";

const COLUMNS: { key: ColumnKey; label: string; align?: "right" }[] = [
  { key: "name", label: "Account" },
  { key: "plan", label: "Plan" },
  { key: "region", label: "Region" },
  { key: "owner", label: "Owner" },
  { key: "mrr", label: "MRR", align: "right" },
  { key: "seats", label: "Seats", align: "right" },
  { key: "status", label: "Status" },
];

const ACCESSORS: Record<ColumnKey, (account: Account) => string | number> = {
  name: (a) => a.name,
  plan: (a) => a.plan,
  region: (a) => a.region,
  owner: (a) => a.owner,
  mrr: (a) => a.mrr,
  seats: (a) => a.seats,
  status: (a) => a.status,
  health: (a) => a.health,
};

interface AccountsTableProps {
  accounts: Account[];
  selectedId: string | null;
  onSelect: (account: Account) => void;
}

export function AccountsTable({ accounts, selectedId, onSelect }: AccountsTableProps) {
  const { query, setQuery, filtered } = useTextFilter(accounts, (a) => [
    a.name,
    a.owner,
    a.plan,
    a.region,
    a.status,
  ]);
  const { sorted, toggle, directionFor } = useSortable(filtered, ACCESSORS);

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Accounts</CardTitle>
          <CardDescription>
            {formatNumber(accounts.length)} account{accounts.length === 1 ? "" : "s"}
          </CardDescription>
        </div>
        <div className="relative w-full lg:w-[340px]">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-muted"
          />
          <Input
            data-testid="table-filter"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Filter accounts"
            placeholder="Filter by name, owner, plan, region, status…"
            className="pl-9"
          />
        </div>
      </CardHeader>

      <CardContent className="px-5 pt-4">
        <TableScroll>
          <Table data-testid="accounts-table">
            <caption className="sr-only">
              Accounts, sortable by column. Select a row to open its full record.
            </caption>
            <TableHead>
              <tr>
                {COLUMNS.map((column) => (
                  <SortableHeader
                    key={column.key}
                    columnKey={column.key}
                    label={column.label}
                    align={column.align}
                    direction={directionFor(column.key)}
                    onToggle={() => toggle(column.key)}
                  />
                ))}
                <SortableHeader
                  columnKey="health"
                  label="Health"
                  direction={directionFor("health")}
                  onToggle={() => toggle("health")}
                />
              </tr>
            </TableHead>
            <TableBody>
              {sorted.map((account) => (
                <TableRow
                  key={account.id}
                  data-testid="account-row"
                  data-account-id={account.id}
                  tabIndex={0}
                  aria-selected={selectedId === account.id}
                  onClick={() => onSelect(account)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onSelect(account);
                    }
                  }}
                  className={cn(
                    "cursor-pointer transition-colors hover:bg-canvas",
                    selectedId === account.id && "bg-brand-50 hover:bg-brand-50",
                  )}
                >
                  <TableCell className="font-semibold whitespace-nowrap text-ink">{account.name}</TableCell>
                  <TableCell>{account.plan}</TableCell>
                  <TableCell>{account.region}</TableCell>
                  <TableCell className="whitespace-nowrap">{account.owner}</TableCell>
                  <TableCell data-testid="cell-mrr" className="text-right tabular-nums text-ink">
                    {formatCurrency(account.mrr)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{account.seats}</TableCell>
                  <TableCell>
                    <StatusBadge status={account.status} />
                  </TableCell>
                  <TableCell>
                    <HealthBar score={account.health} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableScroll>

        {sorted.length === 0 ? (
          <EmptyState
            data-testid="table-empty"
            title="No accounts match that filter"
            description="Try a different name, owner, plan, region or status."
          />
        ) : null}
      </CardContent>
    </Card>
  );
}
