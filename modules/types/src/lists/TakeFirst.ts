import type {
    AllOptionalElements,
    GetOptionalElementCount,
    GetRequiredElementCount,
    HasOptionalElements,
    IsLessThan,
    MakeOptional,
    Min,
    Subtract,
} from "inferred-types/types";

// Simplified Take implementation
type Take<
    TContent extends readonly unknown[],
    TLen extends number,
    TResult extends readonly unknown[] = [],
    TDepth extends readonly unknown[] = [],
> = TDepth["length"] extends TLen
    ? TResult
    : number extends TLen
        ? TContent
        : TDepth["length"] extends 64
            ? TResult
            : [] extends TContent
                    ? TResult
                    : TContent extends readonly [infer Head, ...infer Tail]
                        ? Take<Tail, TLen, [...TResult, Head], [...TDepth, unknown]>
                        : TResult;

// Count how many of the first N elements are optional.
type CountOptionalInFirstN<
    TContent extends readonly unknown[],
    N extends number,
> = number extends N
    ? number
    : GetRequiredElementCount<TContent> extends infer Req extends number
        ? GetOptionalElementCount<TContent> extends infer Opt extends number
            ? Subtract<N, Req> extends infer Delta extends number
                ? IsLessThan<N, Req> extends true
                    ? 0
                    : Min<[Opt, Delta]>
                : 0
            : 0
        : 0;

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
    TReq extends readonly unknown[] = Required<TContent>
> = HasOptionalElements<TContent> extends true
    ? AllOptionalElements<TContent> extends true
        ? Partial<Take<TReq, TLen>>
        : number extends TLen
            ? TContent
            : Take<TReq, TLen> extends infer FirstN extends readonly unknown[]
                ? CountOptionalInFirstN<TContent, TLen> extends infer Optional extends number
                    ? MakeOptional<FirstN, Optional>
                    : never
                : never
    : Take<TContent, TLen>;
