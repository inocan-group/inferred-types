import type { IsIsoTime, RetainAfter, RetainUntil } from "inferred-types/types";
import type { IsIsoDate } from "./IsIsoDate";

/**
 * **IsIso8601DateTime**`<T>`
 *
 * boolean operator which test whether `T` is a valid ISO 8601 DateTime string.
 */
export type IsIso8601DateTime<T> = T extends `${string}T${string}`
  ? IsIsoDate<RetainUntil<T, "T">> extends true
    ? IsIsoTime<RetainAfter<T, "T">> extends true
      ? true
      : false
    : false
  : false;
