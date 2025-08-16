import type {
    And,
    As,
    Contains,
    Dictionary,
    ExtendsSome,
    IsDefined,
    RemoveNever,
    SortOrder
} from "inferred-types/types";

/**
 * **SortOptions**`<[TOrder],[TOffset],[TStart],[TEnd]>`
 *
 * Specifies how you'd like a list sorted.
 */
export type SortOptions = {
    /**
     * the sorting strategy for the list
     *
     * @default "natural"
     */
    order?: SortOrder;

    /**
     * by adding a `PropertyKey` to the offset you are expressing that
     * the items in your list are some sort of a container and you'd
     * like the sorting comparison to be done on the offset/index specified.
     *
     * @default undefined
     */
    offset?: PropertyKey | undefined;

    /**
     * allows pinning items to the _start_ of the list
     *
     * @default []
     */
    start?: readonly unknown[];
    /**
     * allows pinning items to the _end_ of the list
     *
     * @default []
     */
    end?: readonly unknown[];
};

type Start<
    TList extends readonly unknown[],
    TOpt extends SortOptions,
> = RemoveNever<{
    [K in keyof TList]: And<[
        TList[K] extends Dictionary ? true : false,
        IsDefined<TOpt["offset"]>
    ]> extends true
        ? TOpt["offset"] extends keyof TList[K]
            ? ExtendsSome<TList[K][TOpt["offset"]], As<TOpt["start"], readonly unknown[]>> extends true
                ? TList[K]
                : never
            : never
    // test for non-offset comparison
        : ExtendsSome<TList[K], As<TOpt["start"], readonly unknown[]>> extends true
            ? TList[K]
            : never;
}>;

type End<
    TList extends readonly unknown[],
    TOpt extends SortOptions,
> = RemoveNever<{
    [K in keyof TList]: And<[
        TList[K] extends Dictionary ? true : false,
        IsDefined<TOpt["offset"]>
    ]> extends true
        ? TOpt["offset"] extends keyof TList[K]
            ? ExtendsSome<TList[K][TOpt["offset"]], As<TOpt["end"], readonly unknown[]>> extends true
                ? TList[K]
                : never
            : never
    // test for non-offset comparison
        : ExtendsSome<TList[K], As<TOpt["end"], readonly unknown[]>> extends true
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
> = TOpt["start"] extends readonly unknown[]
    ? TOpt["end"] extends readonly unknown[]
        ? [
            ...(
                Start<TList, TOpt> extends readonly unknown[]
                    ? Start<TList, TOpt>
                    : never
            ),
            ...As<
                Remaining<
                    TList,
                    [
                        ...As<Start<TList, TOpt>, readonly unknown[]>,
                        ...As<End<TList, TOpt>, readonly unknown[]>
                    ]
                >,
                readonly unknown[]
            >,
            ...(
                End<TList, TOpt> extends readonly unknown[]
                    ? End<TList, TOpt>
                    : never
            )
        ]
        : [
            ...(
                Start<TList, TOpt> extends readonly unknown[]
                    ? Start<TList, TOpt>
                    : never
            ),
            ...As<
                Remaining<TList, As<Start<TList, TOpt>, readonly unknown[]>>,
                readonly unknown[]
            >,
        ]
    : TOpt["end"] extends readonly unknown[]
        ? [
            ...As<
                Remaining<TList, As<End<TList, TOpt>, readonly unknown[]>>,
                readonly unknown[]
            >,
            ...(
                End<TList, TOpt> extends readonly unknown[]
                    ? End<TList, TOpt>
                    : never
            )
        ]
        : TList;
