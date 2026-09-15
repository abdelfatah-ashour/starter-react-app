import { useCallback, useEffect, useState } from "react";
import type { User } from "@/types";
import type { UserFormValues } from "@/lib/schemas";

let sequence = 0;
const nextId = () => `usr-new-${(sequence += 1)}`;

/**
 * In-memory CRUD store for the Users page. Lives above the page components so
 * edits survive navigating to the Dashboard and back.
 */
export function useUsers(seed: User[] | undefined) {
  const [users, setUsers] = useState<User[] | null>(null);

  // Adopt the fetched list once; later edits are never clobbered by a re-render.
  useEffect(() => {
    if (!seed) return;
    setUsers((current) => current ?? seed);
  }, [seed]);

  const create = useCallback((values: UserFormValues) => {
    const user: User = {
      id: nextId(),
      name: values.name.trim(),
      email: values.email.trim(),
      role: values.role,
      team: values.team.trim(),
      status: "Invited",
      createdAt: new Date().toISOString().slice(0, 10),
      lastLoginAt: null,
    };
    setUsers((current) => [...(current ?? []), user]);
  }, []);

  const update = useCallback((id: string, values: UserFormValues) => {
    setUsers((current) =>
      (current ?? []).map((user) =>
        user.id === id
          ? {
              ...user,
              name: values.name.trim(),
              email: values.email.trim(),
              role: values.role,
              team: values.team.trim(),
            }
          : user,
      ),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setUsers((current) => (current ?? []).filter((user) => user.id !== id));
  }, []);

  return { users: users ?? [], create, update, remove };
}
