import type {
    And,
    As,
    Contains,
    Dictionary,
    ExtendsSome,
    IsDefined,
    RemoveNever
} from "inferred-types/types";

export type SortOptions<
    TFirst extends readonly unknown[] = readonly unknown[],
    TLast extends readonly unknown[] = readonly unknown[],
> = {
    first?: TFirst;
    last?: TLast;
    offset?: undefined | string;
};

type First<
    TList extends readonly unknown[],
    TOpt extends SortOptions,
> = RemoveNever<{
    [K in keyof TList]: And<[
        TList[K] extends Dictionary ? true : false,
        IsDefined<TOpt["offset"]>
    ]> extends true
        ? TOpt["offset"] extends keyof TList[K]
            ? ExtendsSome<TList[K][TOpt["offset"]], As<TOpt["first"], readonly unknown[]>> extends true
                ? TList[K]
                : never
            : never
    // test for non-offset comparison
        : ExtendsSome<TList[K], As<TOpt["first"], readonly unknown[]>> extends true
            ? TList[K]
            : never;
}>;

type Last<
    TList extends readonly unknown[],
    TOpt extends SortOptions,
> = RemoveNever<{
    [K in keyof TList]: And<[
        TList[K] extends Dictionary ? true : false,
        IsDefined<TOpt["offset"]>
    ]> extends true
        ? TOpt["offset"] extends keyof TList[K]
            ? ExtendsSome<TList[K][TOpt["offset"]], As<TOpt["last"], readonly unknown[]>> extends true
                ? TList[K]
                : never
            : never
    // test for non-offset comparison
        : ExtendsSome<TList[K], As<TOpt["last"], readonly unknown[]>> extends true
            ? TList[K]
            : never;
}>;

type Remaining<
    TList extends readonly unknown[],
    TExclude extends readonly unknown[]
> = RemoveNever<{
    [K in keyof TList]: Contains<TExclude, TList[K]> extends true
        ? never
        : TList[K]
}>;

/**
 * **SortApi**`<TList, [TOffset]>`
 *
 * Sorts a tuple value `T` by allowing items to be placed `toTop` or `toBottom`
 */
export type Sort<
    TList extends readonly unknown[],
    TOpt extends SortOptions
> = TOpt["first"] extends readonly unknown[]
    ? TOpt["last"] extends readonly unknown[]
        ? [
            ...(
                First<TList, TOpt> extends readonly unknown[]
                    ? First<TList, TOpt>
                    : never
            ),
            ...As<
                Remaining<
                    TList,
                    [
                        ...As<First<TList, TOpt>, readonly unknown[]>,
                        ...As<Last<TList, TOpt>, readonly unknown[]>
                    ]
                >,
                readonly unknown[]
            >,
            ...(
                Last<TList, TOpt> extends readonly unknown[]
                    ? Last<TList, TOpt>
                    : never
            )
        ]
        : [
            ...(
                First<TList, TOpt> extends readonly unknown[]
                    ? First<TList, TOpt>
                    : never
            ),
            ...As<
                Remaining<TList, As<First<TList, TOpt>, readonly unknown[]>>,
                readonly unknown[]
            >,
        ]
    : TOpt["last"] extends readonly unknown[]
        ? [
            ...As<
                Remaining<TList, As<Last<TList, TOpt>, readonly unknown[]>>,
                readonly unknown[]
            >,
            ...(
                Last<TList, TOpt> extends readonly unknown[]
                    ? Last<TList, TOpt>
                    : never
            )
        ]
        : TList;


