/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExpandRecursively, Narrowable, WithValue } from "~/types";
import { iterateDict } from "./iterateDict";
import { ifTypeOf } from "./ifTypeOf";

const valueTypes = {
  // WIDE
  string: ["" as string, false] as [string, false],
  boolean: [true as boolean, false] as [boolean, false],
  number: [0 as number, false] as [number, false],
  function: [(() => "") as Function, false] as [Function, false],
  object: [{}, false] as [Record<string, any>, false],
  array: <T extends any>(arr: T[] = [] as T[]) => [arr, false] as [T[], false],
  null: [null, false] as [null, false],
  symbol: [Symbol("type") as Symbol, false] as [Symbol, false],
  undefined: [undefined, false] as [undefined, false],
  // NARROW
  true: [true as true, true] as [true, true],
  false: [false as false, true] as [false, true],
  /** pass in a literal type */
  literal: <
    N extends Narrowable,
    T extends Record<any, N> | number | string | boolean | symbol | undefined | null
  >(v: T) => {
    return [v as T, true] as [T, true];
  },
  literalArray: <
    N extends Narrowable,
    T extends Record<any, N> | number | string | boolean | symbol | undefined | null
  >(arr: T[]) => [arr, true],
};

export type ValueTypes = typeof valueTypes;

export type ValueTypeFunc<N extends Narrowable, T extends Record<any, N> | number | string | boolean | symbol | null | Function> =
  (v: ValueTypes) => [T, boolean];

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
export function withValue<
  N extends Narrowable,
  W extends Record<any, N> | number | string | boolean | symbol | null | Function
>(type: ValueTypeFunc<N, W>) {
  type Type = ReturnType<typeof type>[0];

  return <NT extends Narrowable, T extends Record<any, NT>>(obj: T) => {

    return Object.fromEntries(
      [...iterateDict(obj)].filter(([_key, value]) => {
        const [t, l] = type(valueTypes);
        return l
          ? ifTypeOf(value).narrowlyExtends(typeof t === "function" ? t(valueTypes) : t)
          : ifTypeOf(value).extends(typeof t === "function" ? t(valueTypes) : t);
      })
    ) as ExpandRecursively<WithValue<Type, T>>;
  };
}