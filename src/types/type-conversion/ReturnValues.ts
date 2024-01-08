import { AnyFunction,  AfterFirst, First } from "..";

/**
 * **ReturnValues**`<TArray>`
 * 
 * Reduces an array of types to those which are functions and then evaluates
 * these functions return values as narrowly as possible.
 * ```ts
 * // [true, "blue"]
 * type T = ReturnValues<[true, false, () => true, () => "blue"]
 * ```
 */
export type ReturnValues<
  TArray extends readonly unknown[] | unknown[], 
  TResults extends readonly unknown[] = []> = //
  [] extends TArray
    ? TResults
    : First<TArray> extends AnyFunction
      ? ReturnValues<AfterFirst<TArray>, [...TResults, ReturnType<First<TArray>>]>
      : ReturnValues<AfterFirst<TArray>, TResults>;

