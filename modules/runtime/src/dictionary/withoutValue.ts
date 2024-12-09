import { AnyObject, Narrowable, WithoutValue } from "inferred-types/types";

/**
 * **withoutValue**
 *
 * Reduces a dictionary object -- in both _type_ and _run-time_ structure -- to only those
 * key/value pairs which _do not have_ a specified value. For instance:
 *
 * ```ts
 * const obj = { foo: 1, bar: 2, message: "hi there" };
 * // { message: "hi there" }
 * const onlyStrings = withoutValue(t => kind.string())(obj);
 * // { foo: 1 }
 * const justOne = withoutValue(t => kind.literal(1))(obj);
 * ```
 */
export function withoutValue<TVal extends Narrowable>(val: TVal) {
  return <TObj extends AnyObject>(obj: TObj): WithoutValue<TObj,TVal> => {
    return Object.keys(obj).reduce(
      (acc, key) => val === obj[key as keyof TObj]
        ? acc
        : ({...acc, [key]: obj[key as keyof TObj]}),
      {} as WithoutValue<TObj,TVal>
    );
  };
}
