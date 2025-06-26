import type { And, StrLen } from "inferred-types/types";

/**
 * **AllLengthOf**`<TList, TLen>`
 *
 * Tests that a tuple of strings are all of a designated length.
 */
export type AllLengthOf<
    TList extends readonly string[],
    TLen extends number
> = And<{
    [K in keyof TList]: [StrLen<TList[K]>] extends [TLen]
        ? true
        : false
}>;
