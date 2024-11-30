import {  getYesterday, isDate, isLuxonDateTime } from "inferred-types/runtime";
import { isIsoExplicitDate, isMoment, isString, stripAfter } from "inferred-types/runtime";


/**
* **isYesterday`(val)`**
* A boolean test whether on whether the passed in value _represents_ yesterday's date
* as either a:
*
*   - [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date string, or
*   - [Moment.js](https://momentjs.com/docs/#/displaying/)  DateTime object, or
*   - [Luxon](https://moment.github.io/luxon/#/?id=luxon) DateTime object
*/
export const isYesterday = (
  test: unknown
): boolean => {
	if (isString(test)) {
		const justDate = stripAfter(test, "T");
		return isIsoExplicitDate(justDate) && justDate === getYesterday();
	} else if (isMoment(test) || isDate(test)) {
		return (
		  stripAfter(test.toISOString(), "T") === getYesterday()
		);
	} else if (isLuxonDateTime(test)) {
		return (
		  stripAfter(test.toISO(), "T") === getYesterday()
		);
	}

	return false;
};
