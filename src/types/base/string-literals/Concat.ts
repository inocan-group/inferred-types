import { IfLiteral , AfterFirst , First, Tuple } from "..";

type ElementLiteral<T> = T extends string
  ? IfLiteral<T, T, string>
  : T extends number
  ? IfLiteral<T, T, `${number}`>
  : T extends boolean
  ? IfLiteral<T, T, `${boolean}`>
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
  T extends Tuple
> = Process<T>;
