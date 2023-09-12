import { DescribeType, Narrowable, TypeToken } from "src/types";
import { isArray, isBoolean, isFunction, isNull, isNumber, isObject, isString, isSymbol, isTypeToken, isUndefined } from "../type-guards";


const tokenDesc = <T extends TypeToken>(token: T) => {
  // TODO: implement
  return token;
};

const runtimeDesc = <T extends Narrowable>(type: T) => {
  return (
    isString(type) ? "string"
    : isNumber(type) ? "number"
    : isBoolean(type) ? "boolean"
    : isNull(type) ? "null"
    : isUndefined(type) ? "undefined"
    : isArray(type) ? "array"
    : isFunction(type) ? "function"
    : isObject(type) ? "object"
    : isSymbol(type) ? "symbol"
    : "unknown"
  ) as DescribeType<T>;
};

/**
 * **describeType**(type)
 * 
 * Provides a simple "wide type" description to the runtime while 
 * offering slightly more insight to the type system.
 * 
 * **Note:** if the type passed in is actually a `TypeToken` then the 
 * runtime system will get the same resolution as the type system
 * but in other cases this just isn't possible.
 */
export const describeType = <T>(type: T): DescribeType<T> => {

  return (
    isTypeToken(type)
    ? tokenDesc(type)
    : runtimeDesc(type)
  ) as DescribeType<T>;

};
