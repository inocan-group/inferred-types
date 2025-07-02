import type { IsLuxonDateTime } from "./IsLuxonDateTime";
import type { IsMoment } from "./IsMoment";

/**
 * **IsJsDate**`<T>`
 *
 * Boolean utility to test whether `T` is a Javascript Date object.
 */
export type IsJsDate<T> = T extends Date
    ? true
    : false;
