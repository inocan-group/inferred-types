import {  AfterFirst, Dictionary, First, TypedFunction, Values } from "src/types/index";


type ProcessTuple<
  TArray extends readonly unknown[] | unknown[],
  TResults extends readonly unknown[] = []
> = //
  [] extends TArray
    ? TResults
    : First<TArray> extends TypedFunction
      ? ProcessTuple<AfterFirst<TArray>, [...TResults, ReturnType<First<TArray>>]>
      : ProcessTuple<AfterFirst<TArray>, TResults>;
/**
 * **ReturnValues**`<TContainer>`
 *
 * Reduces a container's values down to just the return type of the
 * functions.
 * ```ts
 * // [true, "blue"]
 * type T = ReturnValues<[true, false, () => true, () => "blue"]
 * ```
 *
 * **Related:** `ReduceValues`
 */
export type ReturnValues<
  TContainer extends readonly unknown[] | Dictionary,
> = TContainer extends readonly unknown[]
? ProcessTuple<TContainer>
: TContainer extends Dictionary
  ? ProcessTuple<Values<TContainer>>
  : never
