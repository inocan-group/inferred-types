import type {
    InputTokenLike,
    Narrowable,
} from "inferred-types/types";
import {
    isArray,
    isBoolean,
    isDictionary,
    isFalse,
    isInputToken__Object,
    isInputToken__Tuple,
    isInputTokenLike,
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
    TType extends InputTokenLike
>(
    type: TType,
) {
    return <T extends Narrowable>(val: T): boolean => {
        if (isInputTokenLike(type)) {
            if (isString(type)) {
                if (type === "string") {
                    return isString(val);
                }
                else if (type === "number") {
                    return isNumber(val);
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
            else if (isInputToken__Object(type)) {
                if (isDictionary(val)) {
                    return Object.keys(type).every(
                        k => isInputTokenLike(type[k]) && isNarrowable(val[k]) && doesExtend(type[k])(val[k])
                    );
                }
                else {
                    return false;
                }
            }

            else if (isInputToken__Tuple(type)) {
                if (isArray(val)) {
                    return val.length === type.length
                        ? type.every(
                            (t, i) => isInputTokenLike(t) && isNarrowable(val[i]) && doesExtend(t)(val[i])
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
