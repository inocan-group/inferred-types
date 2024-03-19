import { EnsureLeading } from "./EnsureLeading";
import { EnsureTrailing } from "./EnsureTrailing";

/**
 * **EnsureSurround**
 * 
 * Ensures that `TInput` is _surrounded_ by `TPrefix` and `TPostfix`
 * 
 * **Related:** `Surround`
 */
export type EnsureSurround<
  TPrefix extends string,
  TPostfix extends string
> = <TInput extends string>(input: TInput) => EnsureTrailing<
  EnsureLeading<TInput, TPrefix>, 
  TPostfix
>;
