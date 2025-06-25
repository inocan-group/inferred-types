export type SurroundWith<
    TPrefix extends string,
    TPostfix extends string,
> = <TInput extends string>(input: TInput) => `${TPrefix}${TInput}${TPostfix}`;

/**
 * **surround**(prefix, postfix) -> (input) -> `${prefix}${input}${postfix}`
 *
 * A higher order runtime utility which receives a prefix and postfix string
 * on it's first call. This returns a secondary function which will _surround_
 * the given input with the prefix and postfix strings.
 *
 * **Related:** `ensureSurround()`
 */
export function surround<
    TPrefix extends string,
    TPostfix extends string,
>(prefix: TPrefix, postfix: TPostfix): SurroundWith<TPrefix, TPostfix> {
    return input => `${prefix}${input}${postfix}`;
}
