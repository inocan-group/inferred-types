import type {
    InputToken,
    Narrowable,
} from "inferred-types/types";
import {
    isArray,
    isBoolean,
    isDefineObject,
    isDefineTuple,
    isDictionary,
    isFalse,
    isInputToken,
    isNarrowable,
    isNull,
    isNumber,
    isString,
    isTrue,
    isUndefined,
} from "inferred-types/runtime";

export type DoesExtendTypeguard<
    T extends Narrowable,
> = <TVal extends Narrowable>(val: TVal) => val is T & TVal;

/**
 * **doesExtend**`(type) => (value) => boolean`
 *
 * A higher order utility where the first call provides a type definition
 * and the subsequent call tests whether the value passed in _extends_
 * the type.
 */
export function doesExtend<
    TType extends InputToken
>(
    type: TType,
) {
    return <T extends Narrowable>(val: T): boolean => {
        if (isInputToken(type)) {
            if (isString(type)) {
                if (type === "string") {
                    return isString(val);
                }
                else if (type.startsWith("string(") && type.endsWith(")")) {
                    // Handle string(value1,value2,...) format
                    const values = type.slice(7, -1).split(",").map(v => v.trim());
                    return isString(val) && values.includes(val);
                }
                else if (type === "number") {
                    return isNumber(val);
                }
                else if (type.startsWith("number(") && type.endsWith(")")) {
                    // Handle number(value1,value2,...) format
                    const values = type.slice(7, -1).split(",").map(v => Number(v.trim()));
                    return isNumber(val) && values.includes(val);
                }
                else if (type === "boolean") {
                    return isBoolean(val);
                }
                else if (type === "true") {
                    return isTrue(val);
                }
                else if (type === "false") {
                    return isFalse(val);
                }
                else if (type === "null") {
                    return isNull(val);
                }
                else if (type === "undefined") {
                    return isUndefined(val);
                }
                else if (type === "object") {
                    return isDictionary(val);
                }
            }
            else if (isDefineObject(type)) {
                if (isDictionary(val)) {
                    return Object.keys(type).every(
                        k => isInputToken(type[k]) && isNarrowable(val[k]) && doesExtend(type[k])(val[k])
                    );
                }
                else {
                    return false;
                }
            }

            else if (isDefineTuple(type)) {
                if (isArray(val)) {
                    return val.length === type.length
                        ? type.every(
                            (t, i) => isInputToken(t) && isNarrowable(val[i]) && doesExtend(t)(val[i])
                        )
                        : false;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        return false;
    };
}
