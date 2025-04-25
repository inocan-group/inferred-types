import { isObject } from "inferred-types/runtime";
import { TemporalLike } from "inferred-types/types";


export function isTemporalDate(val: unknown): val is TemporalLike {
    if (
        isObject(val) && "toString" in val && "toJSON" in val &&
        typeof val.toString === "function" &&
        typeof val.toJSON === "function"
    ) {
        try {
            new Date(val.toJSON()); // validate parsability
            return true;
        } catch {
            return false;
        }
    }

    return false
}
