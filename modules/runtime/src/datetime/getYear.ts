import { asDate } from "inferred-types/runtime";
import { DateLike, GetYear } from "inferred-types/types";

export function getYear<T extends DateLike>(date: T) {
    const d = asDate(date);

    return d.getFullYear() as GetYear<T>;
}
