import type {
    WEEK_DAY,
    WEEK_DAY_ABBREV,
    WEEKEND_DAY,
    WEEKEND_DAY_ABBREV
} from "inferred-types/constants";

/**
 * a weekday (abbreviation)
 */
export type WeekDayAbbrev = typeof WEEK_DAY_ABBREV[number];

/**
 * a weekend day (abbreviation)
 */
export type WeekendDayAbbrev = typeof WEEKEND_DAY_ABBREV[number];

/**
 * **DayAbbrev**
 *
 * a day of the week (abbreviated)
 *
 * **Related:** `Day`
 */
export type DayAbbrev = WeekDayAbbrev | WeekendDayAbbrev;

/**
 * a weekday
 */
export type WeekDay = typeof WEEK_DAY[number];

/**
 * a weekend day
 */
export type WeekendDay = typeof WEEKEND_DAY[number];

/**
 * **Day**
 *
 * A day of the week.
 *
 * **Related:** `DayAbbrev`
 */
export type Day = WeekDay | WeekendDay;
