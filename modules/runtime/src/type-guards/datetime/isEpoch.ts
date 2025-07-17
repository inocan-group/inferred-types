import type {
    EpochInMs,
    EpochInSeconds,
    NumberLike,
} from "inferred-types/types";
import {
    isNegativeNumber
} from "runtime/numeric";

/** the epoch timestamp (in seconds) for the date 2500-01-01 */
const EPOCH_2500 = 16725225600;
/** the epoch timestamp (in milliseconds) for July 14th */
const EPOCH_1970_07_14 = 16761600000;

/**
 * **isEpochInSeconds**(timestamp)
 *
 * Epoch timestamps represent times after January 1st, 1970 but up to July 14th,
 * 1970 there is no completely valid what of distinguishing an **epoch** based
 * on _seconds_ versus _milliseconds. After July 14th, no additional context/data
 * is necessary as long as we're willing to "cap" the **epoch** timestamps in seconds
 * to the year 2500.
 *
 * This type-guard attempts to use the constraints above to test whether the value
 * passed in is an epoch timestamp measured in _seconds_.
 *
 * **Related:** `isEpochInSeconds`
 */
export function isEpochInSeconds(timestamp: NumberLike): timestamp is EpochInSeconds {
    return Number(timestamp) >= 0 && Number(timestamp) <= EPOCH_2500;
}

/**
 * **isEpochInMilliseconds**(timestamp)
 *
 * Type guard which converts a numeric timestamp to the
 * type `EpochInMs` based on the fact that:
 *
 * - the NumberLike passed in is _past_ July 14th, 1970
 * - any dates past this point are clearly distinguishable
 * from _seconds_ based timestamps and _milliseconds_ based timestamps
 * if you're willing to assume all dates are _before_ the date
 * **Jan 1st, 2500**.
 * - this should be a practical constraint in most use cases
 *
 * **Related:** `isEpochInSeconds`
 */
export function isEpochInMilliseconds(timestamp: NumberLike): timestamp is EpochInMs {
    return isNegativeNumber(timestamp)
        ? false
        : Number(timestamp) >= EPOCH_1970_07_14;
}
