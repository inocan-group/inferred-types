/* eslint-disable @typescript-eslint/no-explicit-any */
import {  AnyFunction, IsEqual, IsNarrowingFn, Throw } from "src/types/index";



/**
 * **NarrowingFn**`<N>`
 * 
 * Produces a function which helps to narrow down to the type passed in 
 * by assigning generics to all input parameters.
 * 
 * ```ts
 * // <T extends string>(name: string) => string
 * type Fn1 = NarrowingFn<(name: string) => string>;
 * // <T extends number>(v: T) => T
 * type Fn2 = NarrowingFn<number>;
 * // <T extends number>(v: T) => T
 * type Fn2 = NarrowingFn<42>;
 * ```
 * 
 * **Related:** `LiteralFn`, `IsNarrowingFn`
 */
export type NarrowingFn<
  TFn extends AnyFunction
> = IsEqual<Parameters<TFn>, []> extends true
  ? Throw<
      "no-parameters",
      `To make a function a NarrowingFn it must have at least one parameter!`,
      "NarrowingFn",
      { library: "inferred-types"; params: TFn }
    >
  : IsNarrowingFn<TFn> extends true
    ? TFn
    : (<T extends Parameters<TFn>>(...args: T) => ReturnType<TFn>);


