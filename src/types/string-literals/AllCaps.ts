
/**
 * Indicates whether `T` has _all_ uppercase characters in it.
 * ```ts
 * // true
 * type T = AllCaps<"FOOBAR">;
 * // false 
 * type T = AllCaps<"FooBar">;
 * // "unknown"
 * type T = AllCaps<string>;
 * ```
 */
export type AllCaps<T extends string> = string extends T
  ? "unknown"
  : T extends Uppercase<T> ? true : false;