import {
  isString,
  isBoolean,
  isNumber,
  isFunction,
  isSymbol,
  isNull,
  isTrue,
  isFalse,
  isUndefined,
} from "./conditions";
import { isLiteral } from "./conditions/isLiteral";

export type TypeTuple<T> = [name: string, type: T, validator: <I extends unknown>(i: I) => boolean];

export const typeApi = {
  string: () => ["string", "" as string, isString] as const,
  boolean: () => ["boolean", true as boolean, isBoolean] as const,
  number: () => ["number", 1 as number, isNumber] as const,
  function: () => ["function", (() => "") as Function, isFunction] as const,
  null: () => ["null", null, isNull] as const,
  symbol: () => ["symbol", Symbol(), isSymbol] as const,
  undefined: () => ["undefined", undefined, isUndefined] as const,

  true: () => ["true", true, isTrue] as const,
  false: () => ["false", false, isFalse] as const,

  literal: <T extends string | number>(...v: readonly T[]) => ["literal", v, isLiteral(v)] as const,
};

export type TypeApi = typeof typeApi;

function isTypeTuple(input: unknown) {
  return Array.isArray(input) && input.length === 3 && typeof input[0] === "string";
}

export type TypeDefinition<T extends any> = (defn: TypeApi) => T;

export function type<T extends any>(fn: TypeDefinition<T>) {
  const result = fn(typeApi);
  if (!isTypeTuple(result)) {
    throw new Error(
      `The return type of the function passed to type() was invalid! Return types should always be a TypeTuple and the function returned: ${JSON.stringify(
        result
      )}`
    );
  }

  return result;
}
