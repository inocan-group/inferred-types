import { FunctionType, Narrowable } from "~/types";
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

export const typeApi = () =>
  ({
    string: () =>
      ({
        name: "string",
        type: () => "" as string,
        is: isString,
      } as const),
    boolean: () => ({ name: "boolean", type: () => true as boolean, is: isBoolean } as const),
    number: () => ({ name: "number", type: () => 1 as number, is: isNumber } as const),
    function: () =>
      ({
        name: "function",
        type: () => Function as FunctionType,
        is: isFunction,
      } as const),
    null: () => ({ name: "null", type: () => null as null, is: isNull } as const),
    symbol: () => ({ name: "symbol", type: () => Symbol() as Symbol, is: isSymbol } as const),
    undefined: () =>
      ({
        name: "undefined",
        type: () => undefined as undefined,
        is: isUndefined,
      } as const),

    true: () => ({ name: "true", type: () => true as true, is: isTrue } as const),
    false: () => ({ name: "false", type: () => false as false, is: isFalse } as const),

    literal: <T extends string | number>(...v: readonly T[]) =>
      ["literal", v, isLiteral(v)] as const,
  } as const);

export type TypeApi = ReturnType<typeof typeApi>;

export type Type = {
  name: string;
  type: <T extends Narrowable>() => T;
  is: <V extends unknown>(v: V) => true | false | unknown;
};

export function isType(t: unknown): t is Type {
  return (
    typeof t === "object" && ["name", "type", "is"].every((i) => Object.keys(t as {}).includes(i))
  );
}

export type TypeDefinition<T extends any> = (defn: TypeApi) => T;

export function type<T extends any>(fn: TypeDefinition<T>) {
  const result = fn(typeApi());
  if (!isType(result)) {
    throw new Error(
      `When using type(), the callback passed in returned an invalid type! Make sure that you terminate your callback's with function calls.`
    );
  }

  return result;
}
