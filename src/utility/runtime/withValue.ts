/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExpandRecursively, Narrowable, WithValue } from "~/types";
import { entries } from "~/utility/dictionary";
import { type, TypeDefinition } from "~/utility/runtime";

/**
 * **withValue**
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
export function withValue<T extends any>(td: TypeDefinition<T>) {
  const { is } = type(td);
  type Type = typeof typeOf;
  return <NT extends Narrowable, T extends Record<string | number, NT>>(obj: T) => {
    return Object.fromEntries(
      [...entries(obj)].filter(([_key, value]) => {
        return is(value);
        // const [t, l] = type(valueTypes);
        // return l
        //   ? ifTypeOf(value).narrowlyExtends(typeof t === "function" ? t(valueTypes) : t)
        //   : ifTypeOf(value).extends(typeof t === "function" ? t(valueTypes) : t);
      })
    ) as ExpandRecursively<WithValue<Type, T>>;
  };
}
