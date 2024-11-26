
import { isDate, isIsoDate, isIsoDateTime, isLuxonDateTime, isMoment } from "inferred-types/runtime";
import {  LuxonJs, MomentJs } from "inferred-types/types";

/**
* **asDate**`(input)`
*
* Converts common date representations to a Javascript Date object.
*/
export const asDate = <
  T extends string | MomentJs | LuxonJs["DateTime"] | Date
>(
  input: T
): Date => {
  if(isDate(input)) {
    return input;
  }

  if(isMoment(input)) {
    return input.toDate();
  }

  if(isLuxonDateTime(input)) {
    return new Date(input.toMillis());
  }

  if(isIsoDateTime(input)) {
    return new Date(input);
  }

  if(isIsoDate(input)) {
    return new Date(input);
  }

  throw new Error("Invalid date input to asDate() function!");
};
