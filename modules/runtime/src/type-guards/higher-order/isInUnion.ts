import type { Narrowable, SimpleToken } from "inferred-types/types";
import { hasNonStringKeys, isBoolean, isNull, isNumber, isObject, isString, isUndefined } from "inferred-types/runtime";

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
          case "Array<Dict>":
            if (Array.isArray(value) && value.every(i => isObject(i))) {
              return true;
            }
          case "Array<boolean>":
            if (Array.isArray(value) && value.every(i => isBoolean(i))) {
              return true;
            }
          case "Array<number>":
            if (Array.isArray(value) && value.every(i => isNumber(i))) {
              return true;
            }
          case "Array<string>":
            if (Array.isArray(value) && value.every(i => isString(i))) {
              return true;
            }
          case "Dict":
            if (isObject(value)) {
              return true;
            }
          case "Dict<string, unknown>":
            if (!hasNonStringKeys(value)) {
              return true;
            }
          case "boolean":
            if (isBoolean(value)) {
              return true;
            }
          case "null":
            if (isNull(value)) {
              return true;
            }
          case "number":
            if (isNumber(value)) {
              return true;
            }
          case "string":
            if (isString(value)) {
              return true;
            }
          case "undefined":
            if (isUndefined(value)) {
              return true;
            }
          default:
            return acc;
        }
      },
      false,
    );

    return literals.includes(value as any) || isWideType;
  };
}
