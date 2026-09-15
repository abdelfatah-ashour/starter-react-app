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
import { formatCurrency } from "@/lib/format";
import type { Account } from "@/types";
import { useTranslation } from "react-i18next";

type ColumnKey = "name" | "plan" | "region" | "owner" | "mrr" | "seats" | "status" | "health";

const COLUMNS: { key: ColumnKey; align?: "right" }[] = [
  { key: "name" },
  { key: "plan" },
  { key: "region" },
  { key: "owner" },
  { key: "mrr", align: "right" },
  { key: "seats", align: "right" },
  { key: "status" },
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
  const { t } = useTranslation();
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
          <CardTitle>{t("accounts.title")}</CardTitle>
          <CardDescription>
            {t("accounts.count", { count: accounts.length })}
          </CardDescription>
        </div>
        <div className="relative w-full lg:w-[340px]">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 start-3 size-4 -translate-y-1/2 text-ink-muted"
          />
          <Input
            data-testid="table-filter"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label={t("accounts.filterLabel")}
            placeholder={t("accounts.filterPlaceholder")}
            className="ps-9"
          />
        </div>
      </CardHeader>

      <CardContent className="px-5 pt-4">
        <TableScroll>
          <Table data-testid="accounts-table">
            <caption className="sr-only">{t("accounts.caption")}</caption>
            <TableHead>
              <tr>
                {COLUMNS.map((column) => (
                  <SortableHeader
                    key={column.key}
                    columnKey={column.key}
                    label={t(`accounts.columns.${column.key}`)}
                    align={column.align}
                    direction={directionFor(column.key)}
                    onToggle={() => toggle(column.key)}
                  />
                ))}
                <SortableHeader
                  columnKey="health"
                  label={t("accounts.columns.health")}
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
                  <TableCell data-testid="cell-mrr" className="text-end tabular-nums text-ink">
                    {formatCurrency(account.mrr)}
                  </TableCell>
                  <TableCell className="text-end tabular-nums">{account.seats}</TableCell>
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
            title={t("accounts.emptyTitle")}
            description={t("accounts.emptyDescription")}
          />
        ) : null}
      </CardContent>
    </Card>
  );
}
