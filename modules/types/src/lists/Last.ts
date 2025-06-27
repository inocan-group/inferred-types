import type { AfterFirst, IfLength, Tuple } from "inferred-types/types";

/**
 * **Last**`<TList, [TEmpty]>`
 *
 * Returns the _last_ element in a list of elements.
 *
 * - by default `TEmpty` is _never_ but this can be changed.
 */
export type Last<
    TContent extends Tuple,
    TEmpty = never,
> = IfLength<
    TContent,
    1,
    // If only one array element then return it
    TContent[0],
    IfLength<
        TContent,
        0,
        // no array element results in `never` type
        TEmpty,
        // otherwise
        AfterFirst<TContent> extends readonly unknown[]
            ? TContent[AfterFirst<TContent>["length"]] extends TContent[number]
                ? TContent[AfterFirst<TContent>["length"]]
                : TEmpty
            : TEmpty
    >
>;
