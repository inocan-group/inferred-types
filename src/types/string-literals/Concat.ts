import {
  AfterFirst,
  First,
  Tuple,
  IsStringLiteral,
  IsNumericLiteral,
  IsBooleanLiteral
} from "inferred-types/dist/types/index";

type ElementLiteral<T> = [T] extends [string]
  ? IsStringLiteral<T> extends true ? T : string
  : [T] extends [number]
  ? IsNumericLiteral<T> extends true ? T : `${number}`
  : [T] extends [boolean]
  ? IsBooleanLiteral<T> extends true ? T : `${boolean}`
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
