import { Tuple, AfterFirst, First, IfContains } from "src/types/index";


type _Dedupe<
  T extends Tuple,
  TResult extends Tuple = []
> = [] extends T
? TResult
: _Dedupe<
    AfterFirst<T>,
    IfContains<
      TResult, First<T>,
      TResult,
      [...TResult, First<T>]
    >
  >;

/**
 * **Dedupe**`<T>`
 * 
 * Deduplicates a tuple `T` so that only one of each value is represented
 * in the Tuple.
 * ```ts
 * // [1,2,3]
 * type T = Dedupe<[1,2,2,3]>;
 * ```
 */
export type Dedupe<T extends Tuple> = _Dedupe<T>;
