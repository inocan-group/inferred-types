import { asDate } from "inferred-types/runtime";
import { DateLike, Hemisphere } from "inferred-types/types";

/**
 * **getSeason**`(date, [hemisphere])`
 *
 * Gets the season of the passed in `date`.
 */
export function getSeason(
    date: DateLike,
    hemisphere: Hemisphere = "northern"
) {
    const d = asDate(date);



}
