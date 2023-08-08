/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnyObject, WithValue,  Narrowable, ExpandRecursively, Or, IfOr } from "src/types";
import {  isSameTypeOf } from "src/runtime";
import { RuntimeType, runtimeType } from "src/constants";

/**
 * A utility created by the "withValue" runtime utility.
 */
export type PartialWithValue<T> = <TObj extends AnyObject>(obj: TObj) => ExpandRecursively< WithValue<TObj, T>>;

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
export function withValue<TVal extends ((d: RuntimeType) => unknown)>(val: TVal): PartialWithValue<ReturnType<TVal>> {
  return <TObj extends AnyObject>(obj: TObj): ExpandRecursively<WithValue<TObj,ReturnType<TVal>>> => {
    return Object.keys(obj).reduce(
      (acc, key) => isSameTypeOf(val(runtimeType))(obj[key as keyof TObj]) 
        ? ({...acc, [key]: obj[key as keyof TObj]})
        : acc,
      {} as ExpandRecursively<WithValue<TObj,ReturnType<TVal>>>
    );
  };
}

