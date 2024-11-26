import { NumberLike } from "inferred-types/types";
import { asDate } from "./asDate";

/**
* Determines in the passed in date/year is a _leap year_.
*
* - a leap year is a year divisible by 4 but not by 100 (unless also divisible by 400)
*/
export const isLeapYear = (val: NumberLike | Record<string, any> | Date | number) => {
  const year = asDate(val).getUTCFullYear();

  return year % 100 === 0
    ? year % 400 === 0
    : year % 4 === 0
}
