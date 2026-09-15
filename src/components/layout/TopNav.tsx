import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export type PageKey = "dashboard" | "users";

const LINKS: { key: PageKey; label: string }[] = [
  { key: "dashboard", label: "Dashboard" },
  { key: "users", label: "Users" },
];

interface TopNavProps {
  current: PageKey;
  onNavigate: (page: PageKey) => void;
  period?: string;
}

export function TopNav({ current, onNavigate, period }: TopNavProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-hairline bg-surface">
      <div className="flex h-14 items-center gap-3 px-2 sm:gap-6 sm:px-4 lg:px-8">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="size-7 shrink-0 rounded-[9px] bg-brand-500" />
          <h1 className="text-[17px] font-bold tracking-[-0.01em] text-ink">PulseBoard</h1>
        </div>

        <nav aria-label="Primary" className="flex items-center gap-1">
          {LINKS.map((link) => {
            const active = current === link.key;
            return (
              <button
                key={link.key}
                type="button"
                data-testid={`nav-${link.key}`}
                aria-current={active ? "page" : undefined}
                onClick={() => onNavigate(link.key)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  active ? "bg-brand-50 text-brand-600" : "text-ink-muted hover:bg-canvas hover:text-ink",
                )}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {period ? <p className="hidden text-sm text-ink-muted sm:block">{period}</p> : null}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
