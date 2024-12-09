import { isNumber,  isString } from "inferred-types/runtime"
import { Iso8601Year } from "inferred-types/types";

/**
* A type guard which matches a valid ISO 8601 year (e.g., `YYYY`).
*/
export const isIsoYear = (val: unknown): val is Iso8601Year => isString(val) &&
  val.length === 4 &&
  isNumber(Number(val)) &&
  Number(val) >= 0 &&
  Number(val) <= 9999
  ? true
  : false;
