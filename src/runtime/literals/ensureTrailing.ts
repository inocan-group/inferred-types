import { EnsureTrailing } from "../../types/base";

/**
 * **ensureTrailing**(content, strip)
 *
 * Runtime utility which ensures that last part of a string -- `content` -- has the
 * substring `ensure` at the end and adds it if not present.
 */
export function ensureTrailing<T extends string, U extends string>(
  content: T,
  ensure: U
): EnsureTrailing<T, U> {
  return (
    //
    (content.endsWith(ensure) ? content : `${content}${ensure}`) as EnsureTrailing<T, U>
  );
}
