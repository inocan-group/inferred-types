/**
 * **MONTH_NAME**
 *
 * Full month names.
 */
export const MONTH_NAME = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
] as const;

/**
 * **MONTH_ABBR**
 *
 * Abbreviated month names.
 */
export const MONTH_ABBR = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
] as const;

/** the seasons in a year */
export const SEASONS = [
    "Summer",
    "Spring",
    "Fall",
    "Winter"
] as const;

type Season = typeof SEASONS[number];
type MonthAbbr = typeof MONTH_ABBR[number];

/**
 * Maps each season to the months which represent that season (by
 * hemisphere).
 */
export const SEASON_TO_MONTH_LOOKUP = {
    Winter: {northern: ["Dec", "Jan", "Feb"], southern: ["Jun", "Jul", "Aug"]},
    Spring: {northern: ["Mar", "Apr", "May"], southern: ["Sep", "Oct", "Nom"]},
    Summer: {northern: ["Jun", "Jul", "Aug"], southern: ["Dec","Jan","Feb"]},
    Fall: {northern: ["Sep", "Oct", "Nov"], southern: ["Mar","Apr","May"]},
} as const as Record<Season, { northern: MonthAbbr[]; southern: MonthAbbr[] }>


export const WEEK_DAY = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri"
] as const;

export const WEEKEND_DAY = [
    "Sat",
    "Sun"
] as const;

export const DAYS_OF_WEEK__Sun = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
] as const;

export const DAYS_OF_WEEK__Mon = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
] as const;
