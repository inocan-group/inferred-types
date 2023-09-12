import { UpperAlphaChar } from "src/types";

/**
 * Indicates whether `T` has uppercase characters in it.
 * ```ts
 * // true
 * type T = HasUppercase<"Foobar">;
 * // false 
 * type T = HasUppercase<"foobar">;
 * // "unknown"
 * type T = HasUppercase<string>;
 * ```
 */
export type HasUppercase<T extends string> = string extends T
  ? "unknown"
  : T extends `${string}${UpperAlphaChar}${string}` ? true : false;
