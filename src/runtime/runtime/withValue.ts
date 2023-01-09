/* eslint-disable @typescript-eslint/no-unused-vars */

import { ExpandRecursively } from "src/types/ExpandRecursively";
import { Narrowable } from "src/types/Narrowable";
import { entries } from "../dictionary/entries";
import { type, isTypeDefinition } from "./type";

/**
 * **withValue**(type, obj)
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
export function withValue<T extends any, V extends Function>(td: TypeDefinition<T, V>) {
  return <N extends Narrowable, R extends Record<string, N>>(obj: R) => {
    const t = type(td);
    // type Type = typeof t.type;

    return Object.fromEntries(
      [...entries(obj)].filter(([_key, value]) => {
        // runtime check
        // const tg = <X extends { [key]: any }>(value: X): value is Extract<X, { [key]: Type }> =>
        //   t.is(value);
        return t.typeGuard(value);
      })
    ) as unknown as ExpandRecursively<WithValue<T, R>>;
  };
}

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
 *
 * Note: _often useful to provide run-time type profiles with the_ `inferredType` _utility_
 */
export function withoutValue<T extends any, V extends Function>(td: TypeDefinition<T, V>) {
  return <N extends Narrowable, R extends Record<string, N>>(obj: R) => {
    const t = type(td);
    // type Type = typeof t.type;

    return Object.fromEntries(
      [...entries(obj)].filter(([_key, value]) => {
        // runtime check
        // const tg = <X extends { [key]: any }>(value: X): value is Extract<X, { [key]: Type }> =>
        //   t.is(value);
        return t.typeGuard(value);
      })
    ) as unknown as ExpandRecursively<WithValue<T, R>>;
  };
}
