import type {
  AfterFirst,
  Decrement,
  First,
} from "inferred-types/types";

type Take<
  TContent extends readonly unknown[],
  TLen extends number,
  TResult extends readonly unknown[] = [],
> = TLen extends 0
  ? TResult
  : [] extends TContent
      ? TResult
      : Take<AfterFirst<TContent>, Decrement<TLen>, [
        ...TResult,
        First<TContent>,
      ]>;

/**
 * **TakeFirst**`<TContent,TLen,[THandle]>`
 *
 * Takes the first `TLen` items from `TContent` and discards the rest.
 *
 * **Note:**
 * - if `TLen` is larger then the number of elements left in
 * `TContent` then the remaining elements will be returned.
 */
export type TakeFirst<
  TContent extends readonly unknown[],
  TLen extends number,
> = Take<TContent, TLen>;
