import type {
    IsoTimeLike,
    ParseTime,
} from "inferred-types/types";

/**
 * **IsIsoTime**`<T>`
 *
 * Boolean operator which returns `true` when `T` is a valid
 * [ISO 8601 time](https://en.wikipedia.org/wiki/ISO_8601#Times)
 * string of the format:
 *
 * - `HH:MM:SS`, `HH:MM:SS.ms`, `HH:MM:SSZ`, etc.
 */
export type IsIsoTime<T> = T extends IsoTimeLike
    ? ParseTime<T> extends Error
        ? false
        : true
    : false;
