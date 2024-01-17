import { StripLeading } from "src/types/index";

/**
 * **stripLeading**(content, strip)
 * 
 * Runtime utility which strips of a leading substring from the
 * primary content if it exists and leaves content unchanged otherwise.
 */
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
