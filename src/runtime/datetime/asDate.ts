
import { isDate, isIsoDate, isIsoDateTime, isIsoYear, isLuxonDateTime, isMoment, isNumber } from "inferred-types/runtime";

/**
* **asDate**`(input)`
*
* Converts common date representations to a Javascript Date object.
*/
export const asDate = <
  T extends number | string | Record<string,any> | Date
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

  if(isIsoYear(input)) {
    return new Date(`${input}-01-01`);
  }

  if(isNumber(input)) {
    // appears to be year literal
    if(`${input}`.length === 4) {
      return new Date(`${input}-01-01`);
    }
    if (input >= 0) {
      // treat as an epoch timestamp
      return new Date(input * 1000);
    }
  }

  throw new Error("Invalid date input to asDate() function!");
};
