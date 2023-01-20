import { UpperAlpha } from "./alpha-characters";

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
  : T extends `${string}${UpperAlpha}${string}` ? true : false;