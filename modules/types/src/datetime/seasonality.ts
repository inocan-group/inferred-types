import { SEASON_TO_MONTH_LOOKUP, SEASONS } from "inferred-types/constants";
import { Hemisphere } from "inferred-types/types";

/**
 * A season of the year
 */
export type Season = typeof SEASONS[number];


/**
 * **MonthInSeason**`<T,[U]>`
 *
 * Provides a union of the months in a given season.
 *
 * ```ts
 * // "Sep" | "Jul" | "Nov"
 * type Fall = MonthInSeason<"Fall">;
 * // "Mar" | "Apr" | "May"
 * type FallSouth = MonthInSeason<"Fall", "southern">
 * ```
 */
export type MonthInSeason<
    T extends Season,
    U extends Hemisphere = "northern"
> = typeof SEASON_TO_MONTH_LOOKUP[T][U];

