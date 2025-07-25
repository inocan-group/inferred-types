import type {
    AfterFirst,
    AllOptionalElements,
    Decrement,
    First,
    FixedLengthArray,
    GetRequiredElementCount,
    HasOptionalElements,
    Subtract,
} from "inferred-types/types";

type Take<
    TContent extends readonly unknown[],
    TLen extends number,
    TResult extends readonly unknown[] = [],
> = TLen extends 0
    ? TResult
    : [] extends TContent
        ? TResult
        : Take<AfterFirst<TContent>, Decrement<TLen>, [
            ...TResult,
            First<TContent>,
        ]>;

/**
 * **TakeFirst**`<TContent,TLen,[THandle]>`
 *
 * Takes the first `TLen` items from `TContent` and discards the rest.
 *
 * **Note:**
 * - if `TLen` is larger then the number of elements left in
 * `TContent` then only the remaining elements will be returned.
 */
export type TakeFirst<
    TContent extends readonly unknown[],
    TLen extends number,
> = HasOptionalElements<TContent> extends true
    ? AllOptionalElements<TContent> extends true
        ? Partial<Take<Required<TContent>,TLen>>
        : [
            // required props
            ...Take<TContent, TLen>,

            ...(
                GetRequiredElementCount<TContent> extends number
                    ? Required<TContent> extends readonly [
                        ...FixedLengthArray<unknown, GetRequiredElementCount<TContent>>,
                        ...infer Rest
                    ]
                        ? Partial<Take<Rest, Subtract<TLen, GetRequiredElementCount<TContent>>>>
                        : []
                    : []
            )
        ]
    : Take<TContent, TLen>;
