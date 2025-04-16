import { RetainChars, IsWideString, Or, Length } from "inferred-types/types";


/**
 * **CharCount**`<T,C>`
 *
 * Provides the number of characters identified by `C` are present
 * in `T`.
 */
export type CharCount<
    T extends string,
    C extends string
> = Or<[IsWideString<T>,IsWideString<C>]> extends true
? number
: Length<RetainChars<T,C>>;
