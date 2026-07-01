import type { Narrowable, SimpleToken } from "inferred-types/types";
import {
    hasNonStringKeys,
    isBoolean,
    isDictionary,
    isNull,
    isNumber,
    isString,
    isUndefined
} from "runtime/type-guards";

const TOKENS = [
    "undefined",
    "null",
    "string",
    "number",
    "boolean",
    "Array",
    "Array<Dict>",
    "Array<number>",
    "Array<string>",
    "Array<boolean>",
    "Dict",
    "Dict<string, unknown>",
] satisfies SimpleToken[];

/**
 * **isInUnion**(literals) => { typeGuard, meta props }
 *
 * A higher order type guard which:
 *
 * - first call establishes the entities in the union,
 * - you can use tokens like `"string"` or `"number"` to indicate
 * a wide type or any literal value to add a literal to the union.
 *
 * Wide tokens which can be used are:
 *
 * - "undefined", "null"
 * - "string", "number", "boolean", "Dict",
 * - "Array", "Array<string>", "Array<number>"
 * - and more
 *
 * **Related:** `unionize`, `asUnion`
 */
export function isInUnion<
    TOptions extends readonly Narrowable[],
>(...elements: TOptions) {
    return (
        value: unknown,
    ): value is TOptions[number] => {
        const literals = elements.filter(
            i => !isString(i) || (isString(i) && !TOKENS.includes(i as any)),
        );
        const wide = elements.filter(i => TOKENS.includes(i as any)) as Partial<typeof TOKENS>;
        const isWideType = wide.reduce(
            (acc, i) => {
                switch (i) {
                    case "Array":
                        if (Array.isArray(value)) {
                            return true;
                        }
                        return acc;
                    case "Array<Dict>":
                        if (Array.isArray(value) && value.every(i => isDictionary(i))) {
                            return true;
                        }
                        return acc;
                    case "Array<boolean>":
                        if (Array.isArray(value) && value.every(i => isBoolean(i))) {
                            return true;
                        }
                        return acc;
                    case "Array<number>":
                        if (Array.isArray(value) && value.every(i => isNumber(i))) {
                            return true;
                        }
                        return acc;
                    case "Array<string>":
                        if (Array.isArray(value) && value.every(i => isString(i))) {
                            return true;
                        }
                        return acc;
                    case "Dict":
                        if (isDictionary(value)) {
                            return true;
                        }
                        return acc;
                    case "Dict<string, unknown>":
                        if (isDictionary(value) && !hasNonStringKeys(value)) {
                            return true;
                        }
                        return acc;
                    case "boolean":
                        if (isBoolean(value)) {
                            return true;
                        }
                        return acc;
                    case "null":
                        if (isNull(value)) {
                            return true;
                        }
                        return acc;
                    case "number":
                        if (isNumber(value)) {
                            return true;
                        }
                        return acc;
                    case "string":
                        if (isString(value)) {
                            return true;
                        }
                        return acc;
                    case "undefined":
                        if (isUndefined(value)) {
                            return true;
                        }
                        return acc;
                    default:
                        return acc;
                }
            },
            false,
        );

        return literals.includes(value as any) || isWideType;
    };
}
