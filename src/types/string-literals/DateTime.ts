import { 
  DateSeparator,
  HoursMinutes, 
  HoursMinutesSeconds,
  YMD_Simple, 
} from "src/types";


/**
 * **DateTimeMinutes**
 * 
 * The date and time with time resolution of minutes.
 */
export type DateTimeMinutes<
  S extends DateSeparator = DateSeparator
> = `${YMD_Simple<S>} ${HoursMinutes}`;

export type DateTimeSeconds<
  S extends DateSeparator = DateSeparator
> = `${YMD_Simple<S>} ${HoursMinutesSeconds}`;
