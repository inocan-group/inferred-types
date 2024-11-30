import {  getTomorrow,  isDate, isLuxonDateTime } from "inferred-types/runtime";
import { isIsoExplicitDate, isMoment, isString, stripAfter } from "inferred-types/runtime";



/**
* **isTomorrow`(val)`**
* A boolean test which validates whether the passed in value _represents_ tomorrow's date
* as either a:
*
*   - [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date string, or
*   - [Moment.js](https://momentjs.com/docs/#/displaying/)  DateTime object, or
*   - [Luxon](https://moment.github.io/luxon/#/?id=luxon) DateTime object
*/
export const isTomorrow = (
  test: unknown
): boolean => {
	if (isString(test)) {
		const justDate = stripAfter(test, "T");
		return isIsoExplicitDate(justDate) && justDate === getTomorrow();
	} else if (isMoment(test) || isDate(test)) {
		return (
		  stripAfter(test.toISOString(), "T") === getTomorrow()
		);
	} else if (isLuxonDateTime(test)) {
		return (
		  stripAfter(test.toISO(), "T") === getTomorrow()
		);
	}

	return false;
};
