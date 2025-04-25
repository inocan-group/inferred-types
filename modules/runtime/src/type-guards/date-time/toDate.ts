import { isDate } from "inferred-types/runtime";
import { DateLike } from "inferred-types/types";
import { isDayJs } from "src/type-guards/date-time/isDayJs";



export function toDate<T extends DateLike>(date: T) {
    return isDate(date)
        ? date
        : isDayJs(date)
            ? date.

}
