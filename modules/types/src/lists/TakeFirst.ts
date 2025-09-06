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

// Generic decrement using numeric Subtract utility
type Dec<N extends number> = Subtract<N, 1>;

// Simplified Take implementation
type Take<
    TContent extends readonly unknown[],
    TLen extends number,
    TResult extends readonly unknown[] = [],
> = TLen extends 0
    ? TResult
    : [] extends TContent
        ? TResult
        : TContent extends readonly [infer Head, ...infer Tail]
            ? Take<Tail, Dec<TLen>, [...TResult, Head]>
            : TResult;

// Count how many of the first N elements are optional.
// Optional elements in tuples are trailing; therefore among the first N elements,
// the count is clamp(0, min(OptionalCount, N - RequiredCount)).
type CountOptionalInFirstN<
    TContent extends readonly unknown[],
    N extends number,
    Req extends number = GetRequiredElementCount<TContent>,
    Opt extends number = GetOptionalElementCount<TContent>,
    Delta extends number = Subtract<N, Req>
> = IsLessThan<N, Req> extends true
    ? 0
    : Min<[Opt, Delta]>;

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
        : MakeOptional<
            Take<TReq, TLen>,
            CountOptionalInFirstN<TContent, TLen>
        >
    : Take<TContent, TLen>;
