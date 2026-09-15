import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button, buttonIcon } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersTable } from "@/components/users/UsersTable";
import { UserFormDialog } from "@/components/users/UserFormDialog";
import { ConfirmDeleteDialog } from "@/components/users/ConfirmDeleteDialog";
import type { UserFormValues } from "@/lib/schemas";
import type { User } from "@/types";
import { Box, VisuallyHidden } from "@/design/primitives";
import { space } from "@/design/tokens/space.stylex";

const styles = stylex.create({
  content: { paddingInline: space[20], paddingTop: space[16] },
});

interface UsersPageProps {
  users: User[];
  onCreate: (values: UserFormValues) => void;
  onUpdate: (id: string, values: UserFormValues) => void;
  onDelete: (id: string) => void;
}

/** `null` = closed, `"create"` = new user, a `User` = editing that user. */
type FormTarget = null | "create" | User;

export function UsersPage({ users, onCreate, onUpdate, onDelete }: UsersPageProps) {
  const { t } = useTranslation();
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
    <Box data-testid="users-page">
      <VisuallyHidden as="h2">{t("users.title")}</VisuallyHidden>
      <Card>
        <CardHeader>
          <Box>
            <CardTitle>{t("users.title")}</CardTitle>
            <CardDescription>{t("users.count", { count: users.length })}</CardDescription>
          </Box>
          <Button data-testid="user-create" onClick={() => setFormTarget("create")}>
            <Plus aria-hidden="true" {...stylex.props(buttonIcon.sm)} />
            {t("users.newUser")}
          </Button>
        </CardHeader>
        <CardContent sx={styles.content}>
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
    </Box>
  );
}
