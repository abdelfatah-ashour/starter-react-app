import { useId, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { Dialog, DialogTitle, ModalContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  USER_FORM_FIELDS,
  collectFieldErrors,
  userFormSchema,
  type UserFormField,
  type UserFormValues,
} from "@/lib/schemas";
import type { User, UserRole } from "@/types";
import { color } from "@/styles/tokens.stylex";
import { leading } from "@/styles/type.stylex";

const ROLES: UserRole[] = ["Admin", "Manager", "Viewer"];

const emptyValues: UserFormValues = { name: "", email: "", role: "Viewer", team: "" };

const toValues = (user: User | null): UserFormValues =>
  user ? { name: user.name, email: user.email, role: user.role, team: user.team } : emptyValues;

const styles = stylex.create({
  content: { maxWidth: 460, padding: 28 },
  eyebrow: { fontSize: 14, lineHeight: leading.sm, color: color.inkMuted },
  title: {
    marginTop: 2,
    marginBottom: 24,
    paddingInlineEnd: 48,
    fontSize: 24,
    lineHeight: "32px",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: color.ink,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  control: { marginTop: 6 },
  error: { marginTop: 6, fontSize: 13, color: color.bad },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    paddingTop: 4,
  },
});

interface UserFormDialogProps {
  open: boolean;
  /** `null` creates, a user edits. */
  editing: User | null;
  onSubmit: (values: UserFormValues) => void;
  onCancel: () => void;
}

export function UserFormDialog({ open, editing, onSubmit, onCancel }: UserFormDialogProps) {
  // Remount on target change so the form always opens with fresh values.
  const formKey = editing?.id ?? "new";
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onCancel()}>
      {open ? (
        <ModalContent
          data-testid="user-form-dialog"
          closeTestId="user-form-close"
          sx={styles.content}
        >
          <UserForm key={formKey} editing={editing} onSubmit={onSubmit} onCancel={onCancel} />
        </ModalContent>
      ) : null}
    </Dialog>
  );
}

function UserForm({
  editing,
  onSubmit,
  onCancel,
}: Pick<UserFormDialogProps, "editing" | "onSubmit" | "onCancel">) {
  const [values, setValues] = useState<UserFormValues>(() => toValues(editing));
  const [errors, setErrors] = useState<Partial<Record<UserFormField, string>>>({});
  const { t } = useTranslation();
  const ids = useId();

  // Exactly one error carries the `form-error` hook, so the locator stays unique.
  const primaryError = USER_FORM_FIELDS.find((field) => errors[field]);

  const set = (field: UserFormField) => (value: string) =>
    setValues((current) => ({ ...current, [field]: value }) as UserFormValues);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = userFormSchema.safeParse(values);
    if (!result.success) {
      setErrors(collectFieldErrors(result));
      return;
    }
    setErrors({});
    onSubmit(result.data);
  };

  const fieldError = (field: UserFormField) =>
    errors[field] ? (
      <p
        data-testid={primaryError === field ? "form-error" : undefined}
        role="alert"
        {...stylex.props(styles.error)}
      >
        {t(errors[field]!)}
      </p>
    ) : null;

  return (
    <>
      <p {...stylex.props(styles.eyebrow)}>
        {editing ? t("users.form.editEyebrow") : t("users.form.createEyebrow")}
      </p>
      <DialogTitle {...stylex.props(styles.title)}>
        {editing ? editing.name : t("users.form.createTitle")}
      </DialogTitle>

      <form data-testid="user-form" onSubmit={handleSubmit} noValidate {...stylex.props(styles.form)}>
        <div>
          <Label htmlFor={`${ids}-name`}>{t("users.form.name")}</Label>
          <Input
            id={`${ids}-name`}
            name="name"
            value={values.name}
            invalid={Boolean(errors.name)}
            onChange={(event) => set("name")(event.target.value)}
            sx={styles.control}
            autoComplete="off"
          />
          {fieldError("name")}
        </div>

        <div>
          <Label htmlFor={`${ids}-email`}>{t("users.form.email")}</Label>
          <Input
            id={`${ids}-email`}
            name="email"
            type="email"
            value={values.email}
            invalid={Boolean(errors.email)}
            onChange={(event) => set("email")(event.target.value)}
            sx={styles.control}
            autoComplete="off"
          />
          {fieldError("email")}
        </div>

        <div>
          <Label htmlFor={`${ids}-role`}>{t("users.form.role")}</Label>
          <Select
            id={`${ids}-role`}
            name="role"
            value={values.role}
            onChange={(event) => set("role")(event.target.value)}
            sx={styles.control}
          >
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {t(`role.${role}`)}
              </option>
            ))}
          </Select>
          {fieldError("role")}
        </div>

        <div>
          <Label htmlFor={`${ids}-team`}>{t("users.form.team")}</Label>
          <Input
            id={`${ids}-team`}
            name="team"
            value={values.team}
            onChange={(event) => set("team")(event.target.value)}
            sx={styles.control}
            autoComplete="off"
          />
          {fieldError("team")}
        </div>

        <div {...stylex.props(styles.actions)}>
          <Button type="button" variant="outline" data-testid="user-cancel" onClick={onCancel}>
            {t("common.cancel")}
          </Button>
          <Button type="submit" data-testid="user-save">
            {editing ? t("users.form.save") : t("users.form.create")}
          </Button>
        </div>
      </form>
    </>
  );
}
