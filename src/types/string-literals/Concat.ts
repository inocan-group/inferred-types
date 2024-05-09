import {  AfterFirst , First, Tuple, IfStringLiteral, IfNumericLiteral, IfBooleanLiteral } from "src/types/index";

type ElementLiteral<T> = T extends string
  ? IfStringLiteral<T, T, string>
  : T extends number
  ? IfNumericLiteral<T, T, `${number}`>
  : T extends boolean
  ? IfBooleanLiteral<T, T, `${boolean}`>
  : never;

type Process<
  T extends Tuple,
  Result extends string = ""
> = [] extends T
  ? Result
  : Process<
      AfterFirst<T>,
      `${Result}${ElementLiteral<First<T>>}`
    >;

/**
 * **Concat**`<T>`
 * 
 * A type utility which converts an array of strings into a
 * _concatenated_ string type.
 * 
 * ```ts
 * // `${string}-${string}`
 * type T1 = Concat<string, "-", string>;
 * // `foo-bar-baz`
 * type T2 = Concat<"foo", "-", "bar", "-", "baz">;
 * ```
 * 
 * **Related:** `Join<TArr,TWith>`
 */
export type Concat<
  T extends readonly unknown[]
> = Process<T>;
