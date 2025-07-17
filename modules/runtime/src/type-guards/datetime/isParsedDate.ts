import type { DateMeta } from "inferred-types/types";
import { isDictionary } from "runtime/type-guards/isDictionary";

export function isParsedDate(val: unknown): val is DateMeta {
    return isDictionary(val) && "dateType" in val;
}
