import * as stylex from "@stylexjs/stylex";
import { initials } from "@/lib/utils";
import { color } from "@/styles/tokens.stylex";

const styles = stylex.create({
  avatar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: 32,
    height: 32,
    borderRadius: "9999px",
    backgroundColor: color.brand100,
    color: color.brand700,
    fontSize: 11,
    fontWeight: 700,
  },
});

/** Initials chip in front of a person's name. */
export function Avatar({ name }: { name: string }) {
  return (
    <span aria-hidden="true" {...stylex.props(styles.avatar)}>
      {initials(name)}
    </span>
  );
}
