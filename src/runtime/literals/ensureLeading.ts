import { EnsureLeading, ToString } from "src/types/index";

/**
 * **ensureLeading**(content, strip)
 *
 * Runtime utility which ensures that last part of a string -- `content` -- has the
 * substring `ensure` at the end and adds it if not present.
 */
export function ensureLeading<T extends string | number, U extends string>(
  content: T,
  ensure: U
): EnsureLeading<T, U> {
  return (
    String(content).startsWith(ensure)
      ? content 
      : `${ensure}${content}` 
  ) as unknown as EnsureLeading<ToString<T>, U>;
}
