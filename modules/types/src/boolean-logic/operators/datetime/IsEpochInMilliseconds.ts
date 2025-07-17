import type { IsGreaterThanOrEqual, IsInteger } from "types/boolean-logic/operators";

/** the epoch timestamp (in seconds) for the date 2500-01-01 */
type _Epoch_2500 = 16725225600;
/** the epoch timestamp (in milliseconds) for July 14th */
type Epoch_1979_07_14 = 16761600000;

/**
 * **IsEpochInMilliseconds**`<T>`
 *
 * Epoch timestamps represent times after January 1st, 1970 but up to July 14th,
 * 1970 there is no completely valid what of distinguishing an **epoch** based
 * on _seconds_ versus _milliseconds. After July 14th, no additional context/data
 * is necessary as long as we're willing to "cap" the **epoch** timestamps in seconds
 * to the year 2500.
 *
 * This boolean operator attempts to use the constraints above to test whether `T`
 * is an epoch timestamp measured in _milliseconds_.
 */
export type IsEpochInMilliseconds<T> = T extends number
    ? number extends T
        ? boolean
        : IsInteger<T> extends true
            ? IsGreaterThanOrEqual<T, Epoch_1979_07_14>
            : false
    : false;
