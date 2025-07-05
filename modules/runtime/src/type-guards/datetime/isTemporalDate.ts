import type { TemporalLike } from "inferred-types/types";
import { isDictionary } from "inferred-types/runtime";

export function isTemporalDate(val: unknown): val is TemporalLike {
    if (
        isDictionary(val) && "toString" in val && "toJSON" in val
        && typeof val.toString === "function"
        && typeof val.toJSON === "function"
    ) {
        try {
            const _ = new Date(val.toJSON());
            return true;
        }
        catch {
            return false;
        }
    }

    return false;
}
