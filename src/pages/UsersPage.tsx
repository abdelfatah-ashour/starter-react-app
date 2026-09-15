import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersTable } from "@/components/users/UsersTable";
import { UserFormDialog } from "@/components/users/UserFormDialog";
import { ConfirmDeleteDialog } from "@/components/users/ConfirmDeleteDialog";
import type { UserFormValues } from "@/lib/schemas";
import type { User } from "@/types";

interface UsersPageProps {
  users: User[];
  onCreate: (values: UserFormValues) => void;
  onUpdate: (id: string, values: UserFormValues) => void;
  onDelete: (id: string) => void;
}

/** `null` = closed, `"create"` = new user, a `User` = editing that user. */
type FormTarget = null | "create" | User;

export function UsersPage({ users, onCreate, onUpdate, onDelete }: UsersPageProps) {
  const [formTarget, setFormTarget] = useState<FormTarget>(null);
  const [pendingDelete, setPendingDelete] = useState<User | null>(null);

  const editing = formTarget && formTarget !== "create" ? formTarget : null;

  const handleSubmit = (values: UserFormValues) => {
    if (editing) onUpdate(editing.id, values);
    else onCreate(values);
    setFormTarget(null);
  };

  const handleConfirmDelete = () => {
    if (pendingDelete) onDelete(pendingDelete.id);
    setPendingDelete(null);
  };

  return (
    <div data-testid="users-page">
      <h2 className="sr-only">Users</h2>
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              {users.length} {users.length === 1 ? "person" : "people"}
            </CardDescription>
          </div>
          <Button data-testid="user-create" onClick={() => setFormTarget("create")}>
            <Plus className="size-4" aria-hidden="true" />
            New user
          </Button>
        </CardHeader>
        <CardContent className="px-5 pt-4">
          <UsersTable users={users} onEdit={setFormTarget} onDelete={setPendingDelete} />
        </CardContent>
      </Card>

      <UserFormDialog
        open={formTarget !== null}
        editing={editing}
        onSubmit={handleSubmit}
        onCancel={() => setFormTarget(null)}
      />

      <ConfirmDeleteDialog
        user={pendingDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
