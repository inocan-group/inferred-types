import { StripLeading } from "src/types/alphabetic/StripLeading";

export function stripLeading<T extends string, U extends string>(
  content: T,
  strip: U
): StripLeading<T, U> {
  const re = new RegExp(`^${strip}(.*)`);
  return (
    content.startsWith(strip)
      ? // starts with
        content.replace(re, "$1")
      : // does not
        content
  ) as StripLeading<T, U>;
}
