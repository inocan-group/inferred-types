import type { DefineObject } from "inferred-types/types";
import { isObject } from "../isObject";
import { isShapeCallback } from "./isShapeCallback";
import { isShapeToken } from "./isShapeToken";
import { isSimpleToken } from "./isSimpleToken";

/**
 * type guard which validates whether the `val` passed in a `DefineObject`
 */
export function isDefineObject(val: unknown): val is DefineObject {
    return isObject(val) && Object.keys(val).some(
        key => isSimpleToken(val[key])
            || isShapeToken(val),
    );
}
