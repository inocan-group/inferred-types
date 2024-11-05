import {  AfterFirst, Dictionary, First, TypedFunction, Values } from "inferred-types/dist/types/index";


type ProcessTuple<
  TArray extends readonly unknown[] | unknown[],
  TResults extends readonly unknown[] = []
> = //
  [] extends TArray
    ? TResults
    : First<TArray> extends TypedFunction
      ? ProcessTuple<AfterFirst<TArray>, [...TResults, ReturnType<First<TArray>>]>
      : ProcessTuple<AfterFirst<TArray>, [...TResults, First<TArray>]>;
/**
 * **ReduceValues**`<TContainer>`
 *
 * Reduces a container to it's _values_ where if it's a function then the
 *  ReturnType` is returned, if not a function than just it's normal value.
 *
 * ```ts
 * // [true, "blue"]
 * type T = ReduceValues<[true, false, () => true, () => "blue"]
 * ```
 *
 * **Related:** `ReturnValues`, `Values`
 */
export type ReduceValues<
  TContainer extends readonly unknown[] | Dictionary,
> = TContainer extends readonly unknown[]
? ProcessTuple<TContainer>
: TContainer extends Dictionary
  ? ProcessTuple<Values<TContainer>>
  : never
