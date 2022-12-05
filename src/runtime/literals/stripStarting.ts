import { StripStarting } from "src/types/alphabetic/StripStarting";

export function stripStarting<T extends string, U extends string>(
  content: T,
  strip: U
): StripStarting<T, U> {
  const re = new RegExp(`^${strip}(.*)`);
  return (
    content.startsWith(strip)
      ? // starts with
        content.replace(re, "$1")
      : // does not
        content
  ) as StripStarting<T, U>;
}
