import type { DateFnsLike, DayJsLike, LuxonLike, MomentLike, TemporalLike } from "inferred-types/types";

/**
 * **DateLike**
 *
 * Represents structural patterns that look like a type that is a **date**.
 *
 * - a _number_ is assumed to be a Unix Epoch timestamp
 * - the string literal format is meant to match
 * the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) spec
 * "YYYY-MM-DD" format.
 * - and then we have look for objects which _look like_:
 *    - **MomentJS**'s DateTime object
 *    - **DateFns**'s DateTime object
 *    - **Luxon**'s DateTime object
 *    - **Javascript**'s Date object
 */
export type DateLike =
    | number
    | Date
    | `${number}`
    | `${number}-${number}-${number}`
    | `${number}-${number}-${number}T${number}:${number}:${number}`
    | `${number}-${number}-${number}T${number}:${number}:${number}.${number}`
    | `${number}-${number}-${number}T${number}:${number}:${number}${"Z" | `${"+" | "-"}${number}:${number}`}`
    | LuxonLike
    | DayJsLike
    | MomentLike
    | DateFnsLike
    | TemporalLike;
