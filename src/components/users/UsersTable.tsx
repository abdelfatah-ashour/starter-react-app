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

const COLUMNS = ["Name", "Email", "Role", "Team", "Status", "Last login"];

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {
  if (users.length === 0) {
    return <EmptyState title="No users yet" description="Invite a teammate to get started." />;
  }

  return (
    <TableScroll>
      <Table data-testid="users-table">
        <caption className="sr-only">Team members with edit and delete controls.</caption>
        <TableHead>
          <tr>
            {COLUMNS.map((label) => (
              <TableHeaderCell key={label}>{label}</TableHeaderCell>
            ))}
            <TableHeaderCell className="text-right">
              <span className="sr-only">Actions</span>
            </TableHeaderCell>
          </tr>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} data-testid="user-row" data-user-id={user.id} className="hover:bg-canvas">
              <TableCell>
                <span className="flex items-center gap-3">
                  <Avatar name={user.name} />
                  <span className="font-semibold whitespace-nowrap text-ink">{user.name}</span>
                </span>
              </TableCell>
              <TableCell className="whitespace-nowrap">{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="whitespace-nowrap">{user.team}</TableCell>
              <TableCell>
                <StatusBadge status={user.status} />
              </TableCell>
              <TableCell className="whitespace-nowrap">{formatDate(user.lastLoginAt)}</TableCell>
              <TableCell className="text-right">
                <span className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    data-testid="user-edit"
                    onClick={() => onEdit(user)}
                    aria-label={`Edit ${user.name}`}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    data-testid="user-delete"
                    onClick={() => onDelete(user)}
                    aria-label={`Delete ${user.name}`}
                  >
                    Delete
                  </Button>
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableScroll>
  );
}
