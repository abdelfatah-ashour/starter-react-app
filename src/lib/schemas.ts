import { z } from "zod";

/** Runtime contract for /public/data.json — keeps src/types.ts honest at the boundary. */

export const kpiSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.number(),
  format: z.enum(["currency", "number", "percent", "score"]),
  delta: z.number(),
  higherIsBetter: z.boolean(),
});

export const revenuePointSchema = z.object({
  month: z.string(),
  revenue: z.number(),
  target: z.number(),
});

export const accountSchema = z.object({
  id: z.string(),
  name: z.string(),
  plan: z.enum(["Starter", "Growth", "Enterprise"]),
  region: z.enum(["NA", "EMEA", "APAC", "LATAM"]),
  owner: z.string(),
  ownerEmail: z.string(),
  mrr: z.number(),
  seats: z.number(),
  status: z.enum(["Active", "Trial", "At risk", "Churned"]),
  health: z.number(),
  signedUpAt: z.string(),
  lastActiveAt: z.string(),
  notes: z.string(),
});

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.enum(["Admin", "Manager", "Viewer"]),
  team: z.string(),
  status: z.enum(["Active", "Invited", "Suspended"]),
  createdAt: z.string(),
  lastLoginAt: z.string().nullable(),
});

export const dashboardDataSchema = z.object({
  meta: z.object({
    product: z.string(),
    period: z.string(),
    currency: z.string(),
    generatedAt: z.string(),
  }),
  kpis: z.array(kpiSchema),
  revenueSeries: z.array(revenuePointSchema),
  accounts: z.array(accountSchema),
  users: z.array(userSchema),
});

/** The create/edit user form. Messages are i18n keys, translated on render. */
export const userFormSchema = z.object({
  name: z.string().trim().min(1, "validation.nameRequired"),
  email: z.email("validation.emailInvalid"),
  role: z.enum(["Admin", "Manager", "Viewer"]),
  team: z.string().trim(),
});

export type UserFormValues = z.infer<typeof userFormSchema>;

/** Field order drives which error carries the `form-error` hook. */
export const USER_FORM_FIELDS = ["name", "email", "role", "team"] as const;
export type UserFormField = (typeof USER_FORM_FIELDS)[number];

/** Flattens a Zod failure into `{ field: firstMessage }`. */
export function collectFieldErrors(
  result: z.ZodSafeParseResult<UserFormValues>,
): Partial<Record<UserFormField, string>> {
  if (result.success) return {};
  const errors: Partial<Record<UserFormField, string>> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as UserFormField | undefined;
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return errors;
}
