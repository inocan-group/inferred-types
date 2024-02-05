import { EnsureTrailing } from "src/types/string-literals";
import { EnsureLeading } from "src/types/string-literals/EnsureLeading";
import { ensureLeading } from "./ensureLeading";
import { ensureTrailing } from "./ensureTrailing";


export type EnsureSurround<
  TPrefix extends string,
  TPostfix extends string
> = <TInput extends string>(input: TInput) => EnsureTrailing<
  EnsureLeading<TInput, TPrefix>, 
  TPostfix
>;

/**
 * **ensureSurround**(prefix, postfix) -> (input) -> `${prefix}${input}${postfix}`
 * 
 * A higher order runtime utility which receives a prefix and postfix string
 * on it's first call. This returns a secondary function which will _ensure_
 * the given prefix/postfix's surround the input (without duplicating the 
 * prefix/postfix characters if they were already there).
 * 
 * **Related:** `surround()`
 */
export function ensureSurround<
  TPrefix extends string,
  TPostfix extends string
>(prefix: TPrefix, postfix: TPostfix): EnsureSurround<TPrefix, TPostfix> {

  return (input) => ensureTrailing(ensureLeading(input, prefix), postfix);
}

