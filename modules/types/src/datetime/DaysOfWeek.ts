import { WEEK_DAY, WEEKEND_DAY } from "inferred-types/constants";

/**
 * a weekday (abbreviation)
 */
export type WeekDay = typeof WEEK_DAY[number];

/**
 * a weekend day (abbreviation)
 */
export type WeekendDay = typeof WEEKEND_DAY[number]

/**
 * a day of the week
 */
export type Day = WeekDay | WeekendDay;

