import { FunctionType, Narrowable, TypeGuard } from "~/types";
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
  isObject,
  isArray,
  ObjectType,
} from "./conditions";
// import { isLiteral } from "./conditions/isLiteral";

export type Type<T extends any, V extends Function> = {
  name: string;
  type: T;
  typeGuard: TypeGuard<T>;
  is: V;
};

export const typeApi = () =>
  ({
    string: {
      name: "string",
      type: "" as string,
      typeGuard: (v: unknown): v is string => isString(v),
      is: isString,
    } as Type<string, typeof isString>,
    boolean: {
      name: "boolean",
      type: true as boolean,
      typeGuard: (v: unknown): v is boolean => isBoolean(v),
      is: isBoolean,
    } as Type<boolean, typeof isBoolean>,
    number: {
      name: "number",
      type: 1 as number,
      typeGuard: (v: unknown): v is number => isNumber(v),
      is: isNumber,
    } as Type<number, typeof isNumber>,
    function: {
      name: "function",
      type: Function as FunctionType,
      typeGuard: (v: unknown): v is FunctionType => isFunction(v),
      is: isFunction,
    } as Type<FunctionType, typeof isFunction>,
    null: {
      name: "null",
      type: null as null,
      typeGuard: (v: unknown): v is null => isNull(v),
      is: isNull,
    } as Type<null, typeof isNull>,
    symbol: {
      name: "symbol",
      type: Symbol() as Symbol,
      typeGuard: (v: unknown): v is Symbol => isSymbol(v),
      is: isSymbol,
    } as Type<symbol, typeof isSymbol>,
    undefined: {
      name: "undefined",
      type: undefined as undefined,
      typeGuard: (v: unknown): v is undefined => isUndefined(v),
      is: isUndefined,
    } as Type<undefined, typeof isUndefined>,

    true: {
      name: "true",
      type: true as true,
      typeGuard: (v: Narrowable): v is true => isTrue(v),
      is: isTrue,
    } as Type<true, typeof isTrue>,
    false: {
      name: "false",
      type: false as false,
      typeGuard: (v: unknown): v is false => isFalse(v),
      is: isFalse,
    } as Type<false, typeof isFalse>,

    object: {
      name: "object",
      type: {},
      typeGuard: (v: unknown): v is ObjectType => isObject(v),
      is: isObject,
    } as Type<ObjectType, typeof isObject>,

    array: {
      name: "array",
      type: {} as any[],
      typeGuard: (v: unknown): v is Object => isArray(v),
      is: isObject,
    } as Type<any[], typeof isArray>,

    // literal: <T extends Readonly<string>>(...literalValues: T[]) =>
    //   ({
    //     name: "literal",
    //     type: v as T,
    //     typeGuard: (v: unknown): v is T => isLiteral(...literalValues)(v),
    //     is: isLiteral(...literalValues)(v),
    //   } as Type<T, typeof isLiteral>),
  } as const);

export type TypeApi = ReturnType<typeof typeApi>;

export function isType<T extends any, V extends Function>(t: unknown): t is Type<T, V> {
  return (
    typeof t === "object" && ["name", "type", "is"].every((i) => Object.keys(t as {}).includes(i))
  );
}

export type TypeDefinition<T extends any, V extends Function> = (defn: TypeApi) => Type<T, V>;

export function type<T extends any, V extends Function>(fn: TypeDefinition<T, V>) {
  const result = fn(typeApi());
  if (!isType(result)) {
    throw new Error(
      `When using type(), the callback passed in returned an invalid type! Value returned was: ${result}`
    );
  }

  return result;
}
