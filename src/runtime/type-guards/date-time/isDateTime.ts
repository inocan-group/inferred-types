import { Iso8601DateTime } from "inferred-types/dist/types/index";
import { isString, } from "src/runtime/index";


export const isIsoDateTime = (val: unknown): val is Iso8601DateTime => {
  return isString(val) && val.includes(":") && val.includes("-") && val.split("-").length === 3 && val.split(":").length > 1
}
