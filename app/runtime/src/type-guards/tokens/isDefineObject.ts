import { DefineObject } from "@inferred-types/types";
import { isObject } from "../isObject";
import { isSimpleToken } from "./isSimpleToken";
import { isShapeToken } from "./isShapeToken";
import { isShapeCallback } from "./isShapeCallback";

/**
 * type guard which validates whether the `val` passed in a `DefineObject`
 */
export const isDefineObject = (val: unknown): val is DefineObject => {
  return isObject(val) && Object.keys(val).some(
    key => isSimpleToken(val[key]) ||
      isShapeToken(val) ||
      isShapeCallback(val)
  )
}
