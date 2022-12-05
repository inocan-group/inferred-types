import { StripEnding } from "src/types/alphabetic/StripEnding";

export function stripEnding<T extends string, U extends string>(
  content: T,
  strip: U
): StripEnding<T, U> {
  const re = new RegExp(`(.*)${strip}$`);
  return (content.endsWith(strip) ? content.replace(re, "$1") : content) as StripEnding<T, U>;
}
