/**
 * Returns true or false value based on whether the string literal is capitalized.
 * ```ts
 * // true
 * type T2 = IsCapitalized<"One">;
 * // false
 * type T1 = IsCapitalized<"one">;
 * // "unknown"
 * const a: string = "Hi";
 * type T3 = IsCapitalized<typeof a>;
 * ```
 * 
 * Note: _if the value passed in is a "string" then the result will be "unknown"_
 */
export type IsCapitalized<T extends string> = string extends T
  ? "unknown"
  : T extends Capitalize<T> ? true : false;

