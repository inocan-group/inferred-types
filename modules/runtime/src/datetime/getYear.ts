import type { DateLike, GetYear } from "inferred-types/types";
import { asDate } from "inferred-types/runtime";

export function getYear<T extends DateLike>(date: T) {
    const d = asDate(date);

    return d.getFullYear() as GetYear<T>;
}
