import type {
    GetOptionalElementCount,
    HasOptionalElements,
    MakeOptional,
    Min,
    Reverse,
    TakeFirst,
} from "inferred-types/types";

/**
 * **TakeLast**`<TContent,TLen>`
 *
 * Takes the last `TLen` items from `TContent` and discards the rest.
 *
 * Note:
 * - by default if `TLen` is larger than the size of `TContent` this
 * is fine and instead of getting precisely `TLen` elements you'll get
 */
export type TakeLast<
    TContent extends readonly unknown[],
    TLen extends number,
    TReq extends readonly unknown[] = Required<TContent>
> = HasOptionalElements<TContent> extends true
    ? MakeOptional<
        Reverse<TakeFirst<
            Reverse<TReq>,
            TLen
        >> extends readonly unknown[]
            ? Reverse<TakeFirst<
                Reverse<TReq>,
                TLen
            >>
            : [],
        Min<[
            GetOptionalElementCount<TContent>,
            TLen
        ]>
    >

    : Reverse<TakeFirst<
        Reverse<TContent>,
        TLen
    >>;
