import type {
    FromSimpleToken,
    Narrowable,
    SimpleToken,
} from "inferred-types/types";
import {
    infer,
    isArray,
    isBoolean,
    isMap,
    isNarrowableObject,
    isNull,
    isNumber,
    isObject,
    isSetContainer,
    isString,
    isUndefined,
    objectValues,
    startsWith,
    stripAfter,
    stripBefore,
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
export function doesExtend<TType extends SimpleToken>(
    type: TType,
): DoesExtendTypeguard<FromSimpleToken<TType>> {
    return (val): val is FromSimpleToken<TType> => {
        let response: boolean = false;

        if (isString(val)) {
            if (type === "string") {
                response = true;
            }
            if (type.startsWith("string(")) {
                const literals = stripAfter(
                    stripBefore(type, "string("),
                    ")",
                ).split(/,\s*/);
                if (literals.includes(val)) {
                    response = true;
                }
            }
        }

        if (isNumber(val)) {
            if (type === "number") {
                response = true;
            }
            if (type.startsWith("number(")) {
                const literals = stripAfter(
                    stripBefore(type, "number("),
                    ")",
                ).split(/,\s*/).map(Number);
                if (literals.includes(val)) {
                    response = true;
                }
            }
        }

        if (isNull(val) && (type === "null" || type === "Opt<null>")) {
            response = true;
        }

        if (isUndefined(val) && (type === "undefined" || type.startsWith("Opt<"))) {
            response = true;
        }

        if (isBoolean(val)) {
            if (type === "boolean") {
                response = true;
            }
            if (
                (type === "true" && val === true)
                || (type === "false" && val === false)
            ) {
                response = true;
            }
        }

        if (isNarrowableObject(val)) {
            if (type === "Dict" || type === "Dict<string, unknown>") {
                response = true;
            }
            if (startsWith("Dict<")(type)) {
                const match = infer("Dict<{{infer key}}, {{infer value}}>")(type);
                if (match) {
                    const { value } = match;
                    const isOpt = value.includes(`Opt<`);
                    const values = objectValues(val) as any[];
                    if (
                        (values.every(i => isOpt ? isString(i) || isUndefined(i) : isString(i)) && type === "Dict<string, string>")
                        || (values.every(i => isOpt ? isUndefined(i) || isNumber(i) : isNumber(i)) && type === "Dict<string, number>")
                        || (values.every(i => isOpt ? isUndefined(i) || isBoolean(i) : isBoolean(i)) && type === "Dict<string, boolean>")
                    ) {
                        response = true;
                    }
                }
            }
        } // end object

        if (isArray(val)) {
            if (type === "Array" || type === "Array<unknown>") {
                return true;
            }
            if (
                (type === "Array<Dict>" && val.every(isObject))
                || (type === "Array<boolean>" && val.every(isBoolean))
                || (type === "Array<string>" && val.every(isString))
                || (type === "Array<number>" && val.every(isNumber))
                || (type === "Array<Map>" && val.every(isMap))
                || (type === "Array<Set>" && val.every(isSetContainer))
            ) {
                response = true;
            }
        }

        if (isMap(val)) {
            if (
                type === "Map"
                || (type === "Map<Dict, Array>" && Array.from(val.keys()).every(isObject) && Array.from(val.values()).every(isArray))
                || (type === "Map<Dict, Dict>" && Array.from(val.keys()).every(isObject) && Array.from(val.values()).every(isObject))
                || (type === "Map<Dict, boolean>" && Array.from(val.keys()).every(isObject) && Array.from(val.values()).every(isBoolean))
                || (type === "Map<Dict, number>" && Array.from(val.keys()).every(isObject) && Array.from(val.values()).every(isNumber))
                || (type === "Map<Dict, string>" && Array.from(val.keys()).every(isObject) && Array.from(val.values()).every(isString))
                || (type === "Map<Dict, unknown>" && Array.from(val.keys()).every(isObject))
                || (type === "Map<string, string>" && Array.from(val.keys()).every(isString) && Array.from(val.values()).every(isString))
                || (type === "Map<string, number>" && Array.from(val.keys()).every(isString) && Array.from(val.values()).every(isNumber))
                || (type === "Map<string, boolean>" && Array.from(val.keys()).every(isString) && Array.from(val.values()).every(isBoolean))
                || (type === "Map<string, unknown>" && Array.from(val.keys()).every(isString))
                || (type === "Map<number, string>" && Array.from(val.keys()).every(isNumber) && Array.from(val.values()).every(isString))
                || (type === "Map<number, number>" && Array.from(val.keys()).every(isNumber) && Array.from(val.values()).every(isNumber))
                || (type === "Map<number, boolean>" && Array.from(val.keys()).every(isNumber) && Array.from(val.values()).every(isBoolean))
                || (type === "Map<number, unknown>" && Array.from(val.keys()).every(isNumber))
            ) {
                // TODO: this is not complete
                response = true;
            }
        }

        if (isSetContainer(val)) {
            if (
                type === "Set" || type === "Set<unknown>"
                || (type === "Set<boolean>" && Array.from(val).every(isBoolean))
                || (type === "Set<string>" && Array.from(val).every(isString))
                || (type === "Set<number>" && Array.from(val).every(isNumber))
                || (type === "Set<Opt<boolean>>" && Array.from(val).every(i => isBoolean(i) || isUndefined(i)))
                || (type === "Set<Opt<string>>" && Array.from(val).every(i => isString(i) || isUndefined(i)))
                || (type === "Set<Opt<number>>" && Array.from(val).every(i => isNumber(i) || isUndefined(i)))
            ) {
                response = true;
            }
        }

        return response as unknown as ReturnType<DoesExtendTypeguard<FromSimpleToken<TType>>>;
    };
}
