import type {
    FromInputToken,
    FromSimpleToken,
    InputTokenLike,
    InputTokenSuggestions,
    Narrowable,
    SimpleToken,
} from "inferred-types/types";
import {
    err,
    infer,
    isArray,
    isBoolean,
    isFalse,
    isMap,
    isNarrowableObject,
    isNull,
    isNumber,
    isObject,
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
export function doesExtend<TType extends InputTokenSuggestions>(
    type: TType,
) {
    return <T extends Narrowable>(val: T): val is FromInputToken<TType> => {
        let response: boolean = false;

        if(isString(type)) {
            const token = type.trim();

            if(token === "string") {
                return isString(val);
            }
            else if (token === "number") {
                return isNumber(val);
            }
            else if (token === "boolean") {
                return isBoolean(val);
            }
            else if (token === "true") {
                return isTrue(val);
            }
            else if (token === "false") {
                return isFalse(val);
            }
            else if (token === "null") {
                return isNull(val);
            }
            else if (token === "undefined") {
                return isUndefined(val);
            }
            else if ( token === "object" ) {
                return isObject(val);
            }

        };

        throw err(`not-done/doesExtend`, `the doesExtend function is not yet complete!`, { type, val })
    }
}

