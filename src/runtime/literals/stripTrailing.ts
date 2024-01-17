import { StripTrailing } from "src/types/index";

/**
 * **stripTrailing**(content, strip)
 *
 * Runtime utility which ensures that last part of a string has substring
 * removed if it exists and that strong typing is preserved.
 */
export function stripTrailing<T extends string, U extends string>(
  content: T,
  strip: U
): StripTrailing<T, U> {
  const re = new RegExp(`(.*)${strip}$`);
  return (content?.endsWith(strip) ? content.replace(re, "$1") : content) as StripTrailing<T, U>;
}

