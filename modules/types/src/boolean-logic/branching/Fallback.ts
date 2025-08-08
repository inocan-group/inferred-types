import { If, IsNever, IsNull, IsUndefined, UnionFilter } from "inferred-types/types";

type Process<TVal, TFallback> = [TVal] extends [undefined]
    ? TFallback
    : [TVal] extends [null]
        ? TFallback
        : TVal;

/**
 * **Fallback**`<TVal,TFallback>`
 *
 * Branching operator which allows giving a value `TVal` a _default value_ when
 * it's value is either `null`, `undefined`, or `never`.
 */
export type Fallback<
    TVal,
    TFallback extends UnionFilter<TVal, undefined>,
> = [IsNever<TVal>] extends [true]
    ? TFallback
: [IsUndefined<TVal>] extends [true]
    ? TFallback
: [IsNull<TVal>] extends [true]
    ? TFallback
: TVal;


