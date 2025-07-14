import { Contains } from "types/boolean-logic";
import { NumberLike } from "types/numeric-literals/NumberLike";
import { RetainAfter, StrLen } from "types/string-literals";

/**
 * Provides the number of digits _to the right of_ of the decimal
 * place.
 */
export type Precision<T extends NumberLike> = number extends T
? number
: Contains<`${T}`, "."> extends true
    ? StrLen<RetainAfter<`${T}`, ".">>
    : 0

