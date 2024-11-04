import { EnsureSurround } from "@inferred-types/types";
import { ensureLeading, ensureTrailing } from "@inferred-types/runtime";

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
>(prefix: TPrefix, postfix: TPostfix) {

  const fn = <TInput extends string>(
    input: TInput
  ): EnsureSurround<TInput, TPrefix, TPostfix> => {
    let result: string = input;

    result = ensureLeading(result, prefix);
    result = ensureTrailing(result, postfix);

    return result as EnsureSurround<TInput, TPrefix, TPostfix>;
  }

  return fn;
}

