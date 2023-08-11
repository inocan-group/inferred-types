import {  AnyObject, Narrowable, WithValue } from "src/types";
import { RunTypeApi, type, isSameType } from "src/runtime";

export type WithValuePartial<TReturn> = <
  TObj extends AnyObject
>(obj: TObj) => WithValue<TObj,TReturn>;

/**
 * **withValue**
 *
 * Reduces a dictionary object -- in both _type_ and _run-time_ structure -- to only those
 * key/value pairs which _do not have_ a specified value. For instance:
 *
 * ```ts
 * const obj = { foo: 1, bar: 2, message: "hi there" };
 * // { message: "hi there" }
 * const onlyStrings = withoutValue(t => t.string())(obj);
 * // { foo: 1 }
 * const justOne = withoutValue(t => t.literal(1))(obj);
 * ```
 */
export function withValue<
  N extends Narrowable,
  TApi extends (t: RunTypeApi) => N
>(cb: TApi): WithValuePartial<ReturnType<TApi>> {
  return <TObj extends AnyObject>(obj: TObj) => {
    return Object.keys(obj).reduce(
      (acc, key) => isSameType(obj[key],cb(type))
        ? ({...acc, [key]: obj[key]})
        : acc,
      {} as  WithValue<TObj,ReturnType<TApi>>
    ) as WithValue<TObj,ReturnType<TApi>>;
  };
}
