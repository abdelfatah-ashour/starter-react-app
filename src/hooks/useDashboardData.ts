import { useEffect, useState } from "react";
import { dashboardDataSchema } from "@/lib/schemas";
import type { DashboardData } from "@/types";

type State =
  | { status: "loading"; data: null; error: null }
  | { status: "ready"; data: DashboardData; error: null }
  | { status: "error"; data: null; error: string };

/** Loads /data.json once and validates it with Zod before handing it to the app. */
export function useDashboardData() {
  const [state, setState] = useState<State>({ status: "loading", data: null, error: null });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) throw new Error(`Request failed with ${response.status}`);
        const parsed = dashboardDataSchema.parse(await response.json());
        if (!cancelled) setState({ status: "ready", data: parsed, error: null });
      } catch (cause) {
        if (cancelled) return;
        const message = cause instanceof Error ? cause.message : "Unknown error";
        setState({ status: "error", data: null, error: message });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
