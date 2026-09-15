import * as stylex from "@stylexjs/stylex";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
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
import { Box, VisuallyHidden } from "@/design/primitives";
import { bg, fg } from "@/design/tokens/color.stylex";
import { duration } from "@/design/tokens/motion.stylex";
import { icon } from "@/design/tokens/size.stylex";
import { space } from "@/design/tokens/space.stylex";
import { weight } from "@/design/tokens/typography.stylex";

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

const styles = stylex.create({
  search: {
    position: "relative",
    width: { default: "100%", ["@media (min-width: 1024px)"]: 340 },
  },
  searchIcon: {
    pointerEvents: "none",
    position: "absolute",
    top: "50%",
    insetInlineStart: space[12],
    width: icon.sm,
    height: icon.sm,
    transform: "translateY(-50%)",
    color: fg.subtle,
  },
  searchInput: { paddingInlineStart: space[36] },
  content: { paddingInline: space[20], paddingTop: space[16] },
  row: {
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: duration.base,
    backgroundColor: { default: "transparent", ":hover": bg.canvas },
  },
  rowSelected: {
    backgroundColor: { default: bg.accentSubtle, ":hover": bg.accentSubtle },
  },
  nameCell: {
    fontWeight: weight.semibold,
    whiteSpace: "nowrap",
    color: fg.default,
  },
  nowrap: { whiteSpace: "nowrap" },
  numeric: {
    textAlign: "end",
    fontVariantNumeric: "tabular-nums",
  },
  mrrCell: { color: fg.default },
});

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
        <Box>
          <CardTitle>{t("accounts.title")}</CardTitle>
          <CardDescription>{t("accounts.count", { count: accounts.length })}</CardDescription>
        </Box>
        <Box sx={styles.search}>
          <Search aria-hidden="true" {...stylex.props(styles.searchIcon)} />
          <Input
            data-testid="table-filter"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label={t("accounts.filterLabel")}
            placeholder={t("accounts.filterPlaceholder")}
            sx={styles.searchInput}
          />
        </Box>
      </CardHeader>

      <CardContent sx={styles.content}>
        <TableScroll>
          <Table data-testid="accounts-table">
            <VisuallyHidden as="caption">{t("accounts.caption")}</VisuallyHidden>
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
                  sx={[styles.row, selectedId === account.id && styles.rowSelected]}
                >
                  <TableCell sx={styles.nameCell}>{account.name}</TableCell>
                  <TableCell>{account.plan}</TableCell>
                  <TableCell>{account.region}</TableCell>
                  <TableCell sx={styles.nowrap}>{account.owner}</TableCell>
                  <TableCell data-testid="cell-mrr" sx={[styles.numeric, styles.mrrCell]}>
                    {formatCurrency(account.mrr)}
                  </TableCell>
                  <TableCell sx={styles.numeric}>{account.seats}</TableCell>
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
