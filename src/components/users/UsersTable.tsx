import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  TableScroll,
} from "@/components/ui/table";
import { Avatar } from "@/components/shared/Avatar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { formatDate } from "@/lib/format";
import type { User } from "@/types";
import { Inline, Text, VisuallyHidden } from "@/design/primitives";
import { bg, fg } from "@/design/tokens/color.stylex";
import { weight } from "@/design/tokens/typography.stylex";

const COLUMNS = ["name", "email", "role", "team", "status", "lastLogin"] as const;

const styles = stylex.create({
  alignEnd: { textAlign: "end" },
  row: {
    backgroundColor: { default: "transparent", ":hover": bg.canvas },
  },
  name: {
    fontWeight: weight.semibold,
    whiteSpace: "nowrap",
    color: fg.default,
  },
  nowrap: { whiteSpace: "nowrap" },
});

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {
  const { t } = useTranslation();

  if (users.length === 0) {
    return <EmptyState title={t("users.emptyTitle")} description={t("users.emptyDescription")} />;
  }

  return (
    <TableScroll>
      <Table data-testid="users-table">
        <VisuallyHidden as="caption">{t("users.caption")}</VisuallyHidden>
        <TableHead>
          <tr>
            {COLUMNS.map((key) => (
              <TableHeaderCell key={key}>{t(`users.columns.${key}`)}</TableHeaderCell>
            ))}
            <TableHeaderCell sx={styles.alignEnd}>
              <VisuallyHidden>{t("users.columns.actions")}</VisuallyHidden>
            </TableHeaderCell>
          </tr>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} data-testid="user-row" data-user-id={user.id} sx={styles.row}>
              <TableCell>
                <Inline as="span" gap={12}>
                  <Avatar name={user.name} />
                  <Text as="span" sx={styles.name}>
                    {user.name}
                  </Text>
                </Inline>
              </TableCell>
              <TableCell sx={styles.nowrap}>{user.email}</TableCell>
              <TableCell>{t(`role.${user.role}`)}</TableCell>
              <TableCell sx={styles.nowrap}>{user.team}</TableCell>
              <TableCell>
                <StatusBadge status={user.status} />
              </TableCell>
              <TableCell sx={styles.nowrap}>{formatDate(user.lastLoginAt)}</TableCell>
              <TableCell sx={styles.alignEnd}>
                <Inline as="span" gap={8} justify="end">
                  <Button
                    variant="outline"
                    size="sm"
                    data-testid="user-edit"
                    onClick={() => onEdit(user)}
                    aria-label={t("users.editLabel", { name: user.name })}
                  >
                    {t("users.edit")}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    data-testid="user-delete"
                    onClick={() => onDelete(user)}
                    aria-label={t("users.deleteLabel", { name: user.name })}
                  >
                    {t("users.delete")}
                  </Button>
                </Inline>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableScroll>
  );
}
