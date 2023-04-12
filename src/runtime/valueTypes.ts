import { AnyFunction, Key, Narrowable } from "src/types";

export type ValueTuple = [type: unknown, narrowable: boolean];

/**
 * An API surface for choosing a **type** which is defined for run-time
 * use but is translatable to the type system as well.
 */
export type ValueTypes = {
  string: [string, false];
  boolean: [];
};

export const valueTypes = {
  // WIDE
  string: ["" as string, false] as [string, false],
  boolean: [true as boolean, false] as [boolean, false],
  number: [0 as number, false] as [number, false],
  function: [(() => "") as AnyFunction, false] as [AnyFunction, false],
  object: [{}, false] as [Record<string, unknown>, false],
  array: <T>(arr: T[] = [] as T[]) => [arr, false] as [T[], false],
  null: [null, false] as [null, false],
  symbol: [Symbol("type") as symbol, false] as [symbol, false],
  undefined: [undefined, false] as [undefined, false],
  // NARROW
  true: [true as const, true] as [true, true],
  false: [false as const, true] as [false, true],
  /** pass in a literal type */
  literal: <
    N extends Narrowable,
    T extends Record<Key, N> | number | string | boolean | symbol | undefined | null
  >(
    v: T
  ) => {
    return [v as T, true] as [T, true];
  },
  literalArray: <
    N extends Narrowable,
    T extends Record<Key, N> | number | string | boolean | symbol | undefined | null
  >(
    arr: T[]
  ) => [arr, true],
};

export type ValueTypeFunc<
  N extends Narrowable,
  T extends Record<Key, N> | number | string | boolean | symbol | null | AnyFunction
> = (v: ValueTypes) => [T, boolean];
