import { asDate } from "inferred-types/runtime";
import { DayOfWeek } from "inferred-types/types";

/**
* **getDay**`(day)`
*
* Utility which gives the day of the week _index_ for a given date.
*
* - the date representation can be:
*   - a `Date` object
*   - a Moment.js object
*   - a Luxon DateTime object
*   - a string representation of a date
*   - the number representing seconds since the epoch
* - the numeric index starts at 0 for Sunday and ends at 6 for Saturday
*
* **Related:** `getDayName`
*/
export const getDay = (date: Date | string | number): number => {
  const d = asDate(date);
  if(!(d)) {
    throw new Error(`Invalid date passed to getDay()!`);
  }
  return d.getDay();
};

export const getDayName = (date: Date | string | number): DayOfWeek => {
  const lookup: DayOfWeek[] = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];

  return lookup[
    getDay(date)
  ]
}
