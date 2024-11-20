import { isString, isNumberLike } from "src/runtime/index"
import { Iso8601Date } from "inferred-types/dist/types/index";

/**
 * Type guard which validates whether the passed in `val` is an ISO 8601 date
 * representation with an explicit `-` seperator between units (YYYY-MM-DD).
 *
 * **Related:** `isIsoDate`, `isIsoImplictDate`
 */
export const isIsoExplicitDate = (val: unknown): val is Iso8601Date<"explicit"> => {
  if (isString(val)) {
    const parts = val.split("-").map(i => Number(i));

    return val.includes("-")
      ? val.split("-").every(i => isNumberLike(i))
        ? parts[0] >= 0 && parts[0] <= 9999 && parts[1] >= 1 && parts[1] <= 12 && parts[2] >= 1 && parts[2] <= 31
        : false
      : false
  } else {
    return false;
  }
}

/**
 * Type guard which validates whether the passed in `val` is an ISO 8601 date
 * representation without an explicit `-` seperator between units (YYYYMMDD).
 *
 * **Related:** `isIsoDate`, `isIsoExplictDate`
 */
export const isIsoImplicitDate = (val: unknown): val is Iso8601Date<"implicit"> => {
  if (isString(val) && val.length === 8 && isNumberLike(val)) {
    const year = Number(val.slice(0,4));
    const month = Number(val.slice(4,6));
    const date = Number(val.slice(6,8));

    return (
      year >= 0 && year <= 9999 && month >= 1 && month <= 12 && date >= 1 && date <= 31
    )
  } else {
    return false;
  }
}

/**
 * Type guard which validates whether the passed in `val` is an ISO 8601 date
 * representation.
 *
 * **Related:** `isIsoExplictDate`, `isIsoImplictDate`
 */
export const isIsoDate = (val: unknown): val is Iso8601Date<"both"> => {
  if (isString(val)) {
    return val.includes("-")
      ? isIsoExplicitDate(val)
      : isIsoImplicitDate(val)
  } else {
    return false;
  }
}
