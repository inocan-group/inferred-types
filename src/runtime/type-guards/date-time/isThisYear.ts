import { asDate, isNumber, isObject, isString  } from "inferred-types/runtime";


/**
* A validation -- not typeguard -- on whether the passed in `val` is a date or date-time
* representation and that it's year is the same as the current year.
*
* Types correctly handled are:
*
* - **JS Date** object
* - **ISO Date** or **ISO Datetime**
* - a number representing a **epoch** timestamp (in seconds, not miliseconds)
* - **MomentJS** and **Luxon** datetime objects
*/
export const isThisYear = (
  val: unknown
): boolean => {
  // Get current year
  const currentYear = new Date().getFullYear();

  if(isObject(val) || isNumber(val) || isString(val)) {
    try {
      const date = asDate(val);
      if (date) {
        return date.getFullYear() === currentYear;
      }
    } catch {
      return false
    }
  }

  return false;
};
