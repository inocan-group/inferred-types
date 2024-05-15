/* eslint-disable @typescript-eslint/no-explicit-any */
import { Throw, UnionToTuple } from "src/types/index";

type IsAtomicLiteral<T> = [T] extends [string | number | boolean]
? [
  string extends UnionToTuple<T>[0] ? true : false,
  number extends UnionToTuple<T>[0] ? true : false,
  [[false, true]] extends [UnionToTuple<T> ] ? true : false 
] extends [ false, false, false ]
  ? UnionToTuple<T>["length"] extends 1 
      ? true 
      : T extends boolean
        ? UnionToTuple<T>["length"] extends 2
          ? true
          : false
    : false
  : false
: false;

/**
 * **NarrowingFn**`<N>`
 * 
 * Produces a function which helps to narrow down to the type passed in.
 * 
 * ```ts
 * // <T extends string>(name: string) => string
 * type Fn1 = NarrowingFn<(name: string) => string>;
 * // <T extends number>(v: T) => T
 * type Fn2 = NarrowingFn<number>;
 * // <T extends number>(v: T) => T
 * type Fn2 = NarrowingFn<42>;
 * ```
 */
export type NarrowingFn<N> = [N] extends [((...args: infer Args) => any)]
? <T extends Args>(...args: T) => ReturnType<N>
: [IsAtomicLiteral<N>] extends [true]
  ? Throw<
      "invalid-literal",
      `The value passed into NarrowingFn<T> is already "atomic" so it can no longer be narrowed further. Consider using ToFn<T> instead to create an identity function for this value.`,
      "NarrowingFn",
      { library: "inferred-types"; value: N }
    >
  : (<T extends N>(v: T) => T);
