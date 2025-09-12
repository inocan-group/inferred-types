import type { Contains, NumberLike, RetainAfter, StrLen } from "inferred-types/types";

/**
 * Provides the number of digits _to the right of_ of the decimal
 * place.
 */
export type Precision<T extends NumberLike> = number extends T
    ? number
    : Contains<`${T}`, "."> extends true
        ? StrLen<RetainAfter<`${T}`, ".">>
        : 0;
