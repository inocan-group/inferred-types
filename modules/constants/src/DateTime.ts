import type { NUMERIC_CHAR } from "constants/NumericChar";

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

type MonthName = typeof MONTH_NAME[number];

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

type MonthAbbrev = typeof MONTH_ABBR[number];

type NumericChar = typeof NUMERIC_CHAR[number];

type MonthNameLookup = {
    abbrev: MonthAbbrev;
    num: number;
    twoDigitStr: `${NumericChar}${NumericChar}`;
};

type MonthAbbrevLookup = {
    name: MonthName;
    num: number;
    twoDigitStr: `${NumericChar}${NumericChar}`;
};

export const MONTH_NAME_LOOKUP = {
    "January": { abbrev: "Jan", num: 1, twoDigitStr: "01" },
    "February": { abbrev: "Feb", num: 2, twoDigitStr: "02" },
    "March": { abbrev: "Mar", num: 3, twoDigitStr: "03" },
    "April": { abbrev: "Apr", num: 4, twoDigitStr: "04" },
    "May": { abbrev: "May", num: 5, twoDigitStr: "05" },
    "June": { abbrev: "Jun", num: 6, twoDigitStr: "06" },
    "July": { abbrev: "Jul", num: 7, twoDigitStr: "07" },
    "August": { abbrev: "Aug", num: 8, twoDigitStr: "08" },
    "September": { abbrev: "Sep", num: 9, twoDigitStr: "09" },
    "October": { abbrev: "Oct", num: 10, twoDigitStr: "10" },
    "November": { abbrev: "Nov", num: 11, twoDigitStr: "11" },
    "December": { abbrev: "Dec", num: 12, twoDigitStr: "12" }
} as const satisfies Record<MonthName, MonthNameLookup>;

export const MONTH_ABBREV_LOOKUP = {
    "Jan": { name: "January", num: 1, twoDigitStr: "01" },
    "Feb": { name: "February", num: 2, twoDigitStr: "02" },
    "Mar": { name: "March", num: 3, twoDigitStr: "03" },
    "Apr": { name: "April", num: 4, twoDigitStr: "04" },
    "May": { name: "May", num: 5, twoDigitStr: "05" },
    "Jun": { name: "June", num: 6, twoDigitStr: "06" },
    "Jul": { name: "July", num: 7, twoDigitStr: "07" },
    "Aug": { name: "August", num: 8, twoDigitStr: "08" },
    "Sep": { name: "September", num: 9, twoDigitStr: "09" },
    "Oct": { name: "October", num: 10, twoDigitStr: "10" },
    "Nov": { name: "November", num: 11, twoDigitStr: "11" },
    "Dec": { name: "December", num: 12, twoDigitStr: "12" }
} as const satisfies Record<MonthAbbrev, MonthAbbrevLookup>;

/** the seasons in a year */
export const SEASONS = [
    "Summer",
    "Spring",
    "Fall",
    "Winter"
] as const;

type Season = typeof SEASONS[number];
type MonthAbbr = typeof MONTH_ABBR[number];

type Hemisphere = "northern" | "southern";

/**
 * Maps each season to the months which represent that season (by
 * hemisphere).
 */
export const SEASON_TO_MONTH_LOOKUP = {
    Winter: { northern: ["Dec", "Jan", "Feb"], southern: ["Jun", "Jul", "Aug"] },
    Spring: { northern: ["Mar", "Apr", "May"], southern: ["Sep", "Oct", "Nom"] },
    Summer: { northern: ["Jun", "Jul", "Aug"], southern: ["Dec", "Jan", "Feb"] },
    Fall: { northern: ["Sep", "Oct", "Nov"], southern: ["Mar", "Apr", "May"] },
} as const as Record<Season, { northern: MonthAbbr[]; southern: MonthAbbr[] }>;

export const MONTH_TO_SEASON_LOOKUP = {
    northern: {
        "Jan": "Winter",
        "Feb": "Winter",
        "Mar": "Spring",
        "Apr": "Spring",
        "May": "Spring",
        "Jun": "Summer",
        "Jul": "Summer",
        "Aug": "Summer",
        "Sep": "Fall",
        "Oct": "Fall",
        "Nov": "Fall",
        "Dec": "Winter"
    },
    southern: {
        "Jan": "Summer",
        "Feb": "Summer",
        "Mar": "Fall",
        "Apr": "Fall",
        "May": "Fall",
        "Jun": "Summer",
        "Jul": "Summer",
        "Aug": "Summer",
        "Sep": "Spring",
        "Oct": "Spring",
        "Nov": "Spring",
        "Dec": "Summer"
    }
} as const as Record<Hemisphere, Record<MonthAbbr, Season>>;

export const WEEK_DAY_ABBREV = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri"
] as const;

export const WEEK_DAY = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
] as const;

export const WEEKEND_DAY_ABBREV = [
    "Sat",
    "Sun"
] as const;

export const WEEKEND_DAY = [
    "Saturday",
    "Sunday"
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

export const DATE_TYPE = [
    "datetime", // date and time info
    "date", // just date info (YYYY-MM-DD)
    "year-independent", // (--MM-DD)
    "year-month", // (-YYYY-MM)
    "year" // (YYYY)
] as const;

/**
 * valid dates for months with 30 days
 */
export const ISO_DATE_30 = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30"
] as const;

/**
 * valid dates for months with 30 days
 */
export const ISO_DATE_31 = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31"
] as const;

/**
 * the ISO month strings which map to a month with 30 days.
 */
export const ISO_MONTH_WITH_30 = [
    "04",
    "06",
    "09",
    "11"
] as const;
