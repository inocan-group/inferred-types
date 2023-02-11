import { EnsureLeading } from "src/types";

/**
 * **ensureLeading**(content, strip)
 *
 * Runtime utility which ensures that last part of a string -- `content` -- has the
 * substring `ensure` at the end and adds it if not present.
 */
export function ensureLeading<T extends string, U extends string>(
  content: T,
  ensure: U
): EnsureLeading<T, U> {
  return (
    content.startsWith(ensure) 
      ? content : 
      `${ensure}${content}` 
  ) as unknown as EnsureLeading<T, U>;
}
