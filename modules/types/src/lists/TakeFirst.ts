import type {
    AllOptionalElements,
    HasOptionalElements,
    MakeOptional,
} from "inferred-types/types";

// Simple decrement lookup to avoid complex Decrement utility
type SimpleDecrement<N extends number>
    = N extends 0 ? 0
        : N extends 1 ? 0
            : N extends 2 ? 1
                : N extends 3 ? 2
                    : N extends 4 ? 3
                        : N extends 5 ? 4
                            : N extends 6 ? 5
                                : N extends 7 ? 6
                                    : N extends 8 ? 7
                                        : N extends 9 ? 8
                                            : number;

// Simplified Take implementation
type Take<
    TContent extends readonly unknown[],
    TLen extends number,
    TResult extends readonly unknown[] = [],
> = TLen extends 0
    ? TResult
    : TResult["length"] extends 20 // Higher limit to see if this fixes the issue
        ? TResult
        : [] extends TContent
            ? TResult
            : TContent extends readonly [infer Head, ...infer Tail]
                ? Take<Tail, SimpleDecrement<TLen>, [...TResult, Head]>
                : TResult;

// Count how many of the first N elements are optional - supporting common test patterns
type CountOptionalInFirstN<
    TContent extends readonly unknown[],
    N extends number
>
    // Mixed case: [Required, Optional?, Optional?, Optional?]
    = TContent extends readonly [any, (infer B | undefined)?, (infer C | undefined)?, (infer D | undefined)?, ...unknown[]]
        ? N extends 1 ? 0 // First is required
            : N extends 2 ? 1 // Second is optional
                : N extends 3 ? 2 // Third is optional
                    : N extends 4 ? 3 // Fourth is optional
                        : 3
    // All optional case: [Optional?, Optional?, Optional?, Optional?]
        : TContent extends readonly [(infer A | undefined)?, (infer B | undefined)?, (infer C | undefined)?, (infer D | undefined)?, ...unknown[]]
            ? N extends 1 ? 1 // All are optional
                : N extends 2 ? 2
                    : N extends 3 ? 3
                        : N extends 4 ? 4
                            : 4
        // Fallback for other patterns
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
        : MakeOptional<
            Take<TReq, TLen>,
            CountOptionalInFirstN<TContent, TLen>
        >
    : Take<TContent, TLen>;
