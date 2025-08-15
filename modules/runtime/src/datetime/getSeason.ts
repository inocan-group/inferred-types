import type { DateLike, GetSeason, Hemisphere } from "inferred-types/types";
import { MONTH_TO_SEASON_LOOKUP } from "inferred-types/constants";
import { getMonthAbbrev } from "inferred-types/runtime";

/**
 * **getSeason**`(date, [hemisphere])`
 *
 * Gets the season of the passed in `date`.
 */
export function getSeason<
    T extends DateLike,
    H extends Hemisphere
>(
    date: T,
    hemisphere: H = "northern" as H
): GetSeason<T, H> {
    const month = getMonthAbbrev(date);

    return MONTH_TO_SEASON_LOOKUP[hemisphere][month] as GetSeason<T, H>;
}
