import {  getYesterday, isDate, isLuxonDateTime } from "src/runtime/index";
import { isIsoExplicitDate, isMoment, isString, stripAfter } from "src/runtime/index";
import { IsJsDate, IsLuxonDateTime, IsMoment, Iso8601Date, Iso8601DateTime, LuxonJs, MomentJs } from "src/types/index";

type DateType<T> = T extends Iso8601Date<"explicit">
? Iso8601Date<"explicit">
: T extends Iso8601Date<"implicit">
? Iso8601Date<"implicit">
: T extends Iso8601DateTime
? Iso8601DateTime
: IsMoment<T> extends true
? MomentJs
: IsJsDate<T> extends true
? Date
: IsLuxonDateTime<T> extends true
? LuxonJs["DateTime"]
: T extends string
? Iso8601Date | Iso8601DateTime
: never;

/**
* **isYesterday`(val)`**
* A type guard which validates whether the passed in value _represents_ yesterday's date
* as either a:
*
*   - [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date string, or
*   - [Moment.js](https://momentjs.com/docs/#/displaying/)  DateTime object, or
*   - [Luxon](https://moment.github.io/luxon/#/?id=luxon) DateTime object
*/
export const isYesterday = <T>(
  test: T
): test is T & DateType<T> => {
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
