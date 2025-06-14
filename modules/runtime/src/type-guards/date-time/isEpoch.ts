import type {
    EpochInMs,
    EpochInSeconds,
    NumberLike,
} from "inferred-types/types";

/** the epoch timestamp (in seconds) for the date 2500-01-01 */
const EPOCH_2500 = 16725225600;
/** the epoch timestamp (in milliseconds) for July 14th */
const EPOCH_1970_07_14 = 16761600000;

/**
 * **isEpochInSeconds**(timestamp)
 *
 * Type guard which converts a numeric timestamp to the
 * type `EpochInSeconds` based on the fact that:
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
