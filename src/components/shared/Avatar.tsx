import { initials } from "@/lib/utils";

/** Initials chip in front of a person's name. */
export function Avatar({ name }: { name: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[11px] font-bold text-brand-700"
    >
      {initials(name)}
    </span>
  );
}
