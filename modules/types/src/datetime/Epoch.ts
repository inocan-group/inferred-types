declare const __epochinms: unique symbol;

/**
 * An Epoch timestamp in milliseconds
 *
 * - assumes dates after July 14th, 1970 to avoid conflict with
 * timestamps in seconds
 * - or any date if not _auto detected_
 *
 * **Related:** `isEpochInMilliseconds()`, `isEpoch()`
 */
export type EpochInMs = number & {
    [__epochinms]: "EpochInMs";
};

declare const __epochinseconds: unique symbol;

/**
 * An Epoch timestamp in seconds
 *
 * - assumes dates before Jan 1st, 2500 to avoid conflict with timestamps
 * in milliseconds
 * - or any date if not _auto detected_
 *
 * **Related:** `isEpochInSeconds()`, `isEpoch()`
 */
export type EpochInSeconds = number & {
    [__epochinseconds]: "EpochInSeconds";
};
