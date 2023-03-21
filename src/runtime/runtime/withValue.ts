/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnyObject, WithValue,  Narrowable } from "src/types";
import {  isSameTypeOf } from "src/runtime";

/**
 * **withValue**(value) => (obj) => WithValue<TObj,TVal>
 *
 * Reduces a dictionary object -- in both _type_ and _run-time_ structure -- to only those
 * key/value pairs which have a specified value. For instance:
 *
 * ```ts
 * const obj = { foo: 1, bar: 2, message: "hi there" };
 * // { message: "hi there" }
 * const onlyStrings = withValue(t => t.string)(obj);
 * // { foo: 1 }
 * const justOne = withValue(t => t.literal(1))(obj);
 * ```
 *
 * Note: _often useful to provide run-time type profiles with the_ `inferredType` _utility_
 */
export function withValue<TVal extends Narrowable>(val: TVal) {
  return <TObj extends AnyObject>(obj: TObj): WithValue<TObj,TVal> => {
    return Object.keys(obj).reduce(
      (acc, key) => isSameTypeOf(val)(obj[key as keyof TObj]) 
        ? ({...acc, [key]: obj[key as keyof TObj]})
        : acc,
      {} as WithValue<TObj,TVal>
    );
  };
}

