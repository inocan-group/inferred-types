import { Narrowable } from "~/types/Narrowable";

export type ValueTuple = [type: any, narrowable: boolean];

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
  >(
    v: T
  ) => {
    return [v as T, true] as [T, true];
  },
  literalArray: <
    N extends Narrowable,
    T extends Record<any, N> | number | string | boolean | symbol | undefined | null
  >(
    arr: T[]
  ) => [arr, true],
};

export type ValueTypeFunc<
  N extends Narrowable,
  T extends Record<any, N> | number | string | boolean | symbol | null | Function
> = (v: ValueTypes) => [T, boolean];
