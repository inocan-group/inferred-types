import { IfLiteral } from "src/types/boolean-logic";
import { AfterFirst } from "src/types/lists/AfterFirst";
import { First } from "src/types/lists/First";



type ConcatElement =  (string | number | boolean);
type ElementLiteral<T extends ConcatElement> = T extends string 
  ? IfLiteral<T, T, string>
  : T extends number
    ? IfLiteral<T, T, `${number}`>
    : T extends boolean
      ? IfLiteral<T, T, `${boolean}`>
      : never;

type ConcatAcc<
  T extends readonly ConcatElement[] | ConcatElement[], 
  Result extends string = ""
> = [] extends T
    ? Result
    : ConcatAcc<AfterFirst<T>, `${Result}${ElementLiteral<First<T>>}`>;

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
export type Concat<T extends readonly ConcatElement[] | ConcatElement[], > = ConcatAcc<T>;

