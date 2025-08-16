import type { IsNull, IsUndefined, IsUnion, UnionFilter, UnionMemberExtends } from "inferred-types/types";

/**
 * **Fallback**`<TVal,TFallback>`
 *
 * Branching operator which allows giving a value `TVal` a _default value_ when
 * it's value is either `null`, `undefined`, or `never`.
 */
export type Fallback<
    TVal,
    TFallback
> = [IsUnion<TVal>] extends [true]
    ? [UnionMemberExtends<TVal, undefined | null>] extends [true]
        ? UnionFilter<TVal, undefined | null> | TFallback
        : TVal
    : IsNull<TVal> extends true
        ? TFallback
        : IsUndefined<TVal> extends true
            ? TFallback
            : TVal;
