import { IANA_TIMEZONES } from "inferred-types/constants";
import { IanaZone } from "inferred-types/types";
import { isString } from "runtime/type-guards/isString";

/**
 * a type-guard which validates that `val` is of the type
 * `IanaZone`.
 */
export function isIanaTimezone(val: unknown): val is IanaZone {
    return isString(val) && IANA_TIMEZONES.includes(val as any);
}
