import type { TemporalLike } from "inferred-types/types";
import { isDictionary } from "inferred-types/runtime";

export function isTemporalDate(val: unknown): val is TemporalLike {
    return typeof isDictionary(val) &&
        !!Object.prototype.toString.call(val).startsWith("[object Temporal.")
}
