import * as stylex from "@stylexjs/stylex";
import { initials } from "@/lib/utils";
import { bg, fg } from "@/design/tokens/color.stylex";
import { radius } from "@/design/tokens/shape.stylex";
import { space } from "@/design/tokens/space.stylex";
import { text } from "@/design/text";

const styles = stylex.create({
  avatar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: space[32],
    height: space[32],
    borderRadius: radius.full,
    backgroundColor: bg.accentSoft,
    color: fg.accentStrong,
  },
});

/** Initials chip in front of a person's name. */
export function Avatar({ name }: { name: string }) {
  return (
    <span aria-hidden="true" {...stylex.props(text.micro, styles.avatar)}>
      {initials(name)}
    </span>
  );
}
