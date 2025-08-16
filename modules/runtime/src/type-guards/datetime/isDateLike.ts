import type { DateLike } from "inferred-types/types";
import { isInteger, isNumber, isString } from "runtime/type-guards";
import {
    isDate,
    isIsoDate,
    isIsoDateTime,
    isLuxonDate,
    isMoment,
    isTemporalDate
} from "runtime/type-guards/datetime";

/**
 * A type guard which checks if `val` is _date like_:
 *
 * - a number (or `NumberLike`) and therefore assumed to be an Epoch timestamp
 * - a string in the shape of the ISO 8601 specification
 * - an object in the shape of:
 *    - Javascript Date object
 *    - DateFNS Date object
 *    - MomentJS Date object
 *    - Luxon Date object
 */
export function isDateLike(val: unknown): val is DateLike {
    return (
        (isNumber(val) && isInteger(val) && val > 0) // epoch
        || (isString(val) && (isIsoDate(val) || isIsoDateTime(val))) // ISO
        || (
            isDate(val)
            || isMoment(val)
            || isLuxonDate(val)
            || isTemporalDate(val)
        ) // Object based
    );
}
