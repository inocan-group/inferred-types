import type { MONTH_TO_SEASON_LOOKUP } from "inferred-types/constants";
import type { DateLike, GetMonthAbbrev, Hemisphere, ParseDate, ParsedDate, Season } from "inferred-types/types";

type Lookup = typeof MONTH_TO_SEASON_LOOKUP;

export type GetSeason<
    T extends DateLike,
    H extends Hemisphere = "northern"
> = ParseDate<T> extends ParsedDate
    ? GetMonthAbbrev<T> extends keyof Lookup[H]
        ? Lookup[H][GetMonthAbbrev<T>]
        : Season
    : Season;
