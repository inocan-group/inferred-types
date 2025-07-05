import type { DateFnsLike } from "inferred-types/types";
import { isDictionary } from "inferred-types/runtime";

export function isDateFnsDate(val: unknown): val is DateFnsLike {
    if (isDictionary(val) && "startOfDay" in val && typeof val.startOfDay === "function") {
        try {
            return val.startOfDay() instanceof Date;
        }
        catch {
            return false;
        }
    }

    return false;
}
