import { asDate } from "inferred-types/runtime";
import { DateLike, GetMonthNumber } from "inferred-types/types";


export function getMonthNumber<T extends DateLike>(date: T): GetMonthNumber<T> {
    const d = asDate(date);

    return d.getMonth() + 1 as GetMonthNumber<T>;
}
