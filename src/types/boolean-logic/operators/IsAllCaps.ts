
/**
 * **IsAllCaps**`<T>
 * 
 * Boolean operator which returns _true_ when `T` consists of ALL capital letters.
 * 
 * - Note: non-alphabetic characters are ignored by this utility
 * 
 * ```ts
 * // true
 * type T = AllCaps<"FOOBAR">;
 * type T2 = AllCaps<"FOOBAR2">;
 * // false 
 * type T = AllCaps<"FooBar">;
 * // boolean
 * type T = AllCaps<string>;
 * ```
 * 
 * **Related:** `IsAllLowercase`
 */
export type IsAllCaps<T extends string> = string extends T
  ? boolean
  : T extends Uppercase<T> ? true : false;
