import type { DateMeta } from "inferred-types/types";
import { DATE_TYPE } from "inferred-types/constants";
import { isDictionary } from "runtime/type-guards";

/**
 * type guard which validates that `val` is the type `DateMeta`.
 */
export function isDateMeta(val: unknown): val is DateMeta {
    return isDictionary(val) && "dateType" in val && DATE_TYPE.includes((val as any).dateType);
}
