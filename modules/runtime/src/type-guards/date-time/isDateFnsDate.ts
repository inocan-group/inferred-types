import { isObject } from "inferred-types/runtime";
import { DateFnsLike } from "inferred-types/types";

export function isDateFnsDate(val: unknown): val is DateFnsLike {
    if (isObject(val) && "startOfDay" in val && typeof val.startOfDay === "function") {
        try {
            return val.startOfDay() instanceof Date;
        } catch {
            return false;
        }
    }

    return false;
}
