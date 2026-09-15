import { useMemo, useState } from "react";

/**
 * Case-insensitive substring filter across a set of fields on each row.
 * Returns the query, a setter, and the narrowed rows.
 */
export function useTextFilter<T>(rows: T[], fields: (row: T) => (string | number)[]) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((row) =>
      fields(row).some((value) => String(value).toLowerCase().includes(needle)),
    );
    // `fields` is a stable literal at every call site.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, query]);

  return { query, setQuery, filtered };
}
