import { Thenable } from "inferred-types/dist/types/index";
import { isObject } from "./isObject";
/**
* type guard which checks whether passed in `val` is a `Thenable` object
*/
export const isThenable = (val: unknown): val is Thenable => {
  return isObject(val) && "then" in val && "catch" in val && typeof val.then === "function";
}
