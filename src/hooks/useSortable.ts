import { useMemo, useState } from "react";

export type SortDirection = "asc" | "desc";

export interface SortState<K extends string> {
  key: K;
  direction: SortDirection;
}

/**
 * Generic column sorting for any row shape.
 *
 * Clicking a new column sorts ascending; clicking the active column toggles to
 * descending, then clears back to the source order.
 */
export function useSortable<T, K extends string>(
  rows: T[],
  accessors: Record<K, (row: T) => string | number>,
  initial: SortState<K> | null = null,
) {
  const [sort, setSort] = useState<SortState<K> | null>(initial);

  const toggle = (key: K) =>
    setSort((current) => {
      if (!current || current.key !== key) return { key, direction: "asc" };
      if (current.direction === "asc") return { key, direction: "desc" };
      return null;
    });

  const sorted = useMemo(() => {
    if (!sort) return rows;
    const read = accessors[sort.key];
    const factor = sort.direction === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const left = read(a);
      const right = read(b);
      if (typeof left === "number" && typeof right === "number") {
        return (left - right) * factor;
      }
      return String(left).localeCompare(String(right), "en") * factor;
    });
    // `accessors` is a stable literal at every call site.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, sort]);

  const directionFor = (key: K): SortDirection | null =>
    sort?.key === key ? sort.direction : null;

  return { sorted, sort, toggle, directionFor };
}
