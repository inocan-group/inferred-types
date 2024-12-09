import { EnsureLeading, EnsureTrailing } from "inferred-types/types";

/**
 * **EnsureSurround**
 *
 * Ensures that `TInput` is _surrounded_ by `TPrefix` and `TPostfix`
 *
 * **Related:** `Surround`
 */
export type EnsureSurround<
  TInput extends string,
  TPrefix extends string,
  TPostfix extends string
> = EnsureTrailing<
  EnsureLeading<TInput, TPrefix>,
  TPostfix
>;
