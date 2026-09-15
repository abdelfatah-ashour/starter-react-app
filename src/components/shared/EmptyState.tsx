interface EmptyStateProps {
  title: string;
  description?: string;
  "data-testid"?: string;
}

/** Shown in place of table rows when a filter matches nothing. */
export function EmptyState({ title, description, ...props }: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-1 px-4 py-14 text-center"
      {...props}
    >
      <p className="text-sm font-semibold text-ink">{title}</p>
      {description ? <p className="text-[13px] text-ink-muted">{description}</p> : null}
    </div>
  );
}
