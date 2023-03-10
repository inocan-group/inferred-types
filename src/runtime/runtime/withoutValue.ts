import { AnyObject, Narrowable, WithoutValue } from "src/types";
import { keysOf } from "../dictionary";

/**
 * **withoutValue**
 *
 * Reduces a dictionary object -- in both _type_ and _run-time_ structure -- to only those
 * key/value pairs which _do not have_ a specified value. For instance:
 *
 * ```ts
 * const obj = { foo: 1, bar: 2, message: "hi there" };
 * // { message: "hi there" }
 * const onlyStrings = withoutValue(t => t.string)(obj);
 * // { foo: 1 }
 * const justOne = withoutValue(t => t.literal(1))(obj);
 * ```
 */
export function withoutValue<TVal extends Narrowable>(val: TVal) {
  return <TObj extends AnyObject>(obj: TObj): WithoutValue<TObj,TVal> => {
    return keysOf(obj).reduce(
      (acc, key) => val === obj[key]
        ? acc
        : ({...acc, [key]: obj[key]}),
      {} as WithoutValue<TObj,TVal>
    );
  };
}
