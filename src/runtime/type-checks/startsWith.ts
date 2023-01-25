import { Narrowable } from "src/types";
import { IfTrue, StartsWith } from "types/boolean-logic";
import { createFnWithProps } from "runtime/functions";
import { box, Box } from "../literals";
import { startsWith } from "../type-guards/higher-order/startsWith";
import { ifTrue } from "./ifTrue";

export type NarrowFn<N extends string> = <F extends <T extends string>(input: T) => any>(
  fn: F
) => (input: N) => Box<F>["unbox"];

export const stringLiteralFn = <F extends <T extends string>(input: T) => any>(fn: F) => {
  const b = box(fn);
  const api = {
    narrow<N extends string>() {
      return (input: N) => b.unbox()(input);
    },
  };

  return createFnWithProps(fn, api);
};

export type StringLiteralFn<S extends string = string> = <T extends S>(input: T) => any;

/**
 * **ifStartsWith**
 *
 * Type strong way to move into a conditional execution block:
 * ```ts
 * // partial application
 * const mutate = ifStartsWith(
 *    "foo",
 *    i => `${i} is a foo`,
 *    i => `${i} ain't welcome in this town`
 * );
 * // type: `foobar is a foo`
 * const outcome = mutate("foobar");
 * ```
 *
 * Where the variable `i` will _extend_ a string and function which this utility
 * returns is able to
 */
export const ifStartsWith =<
TStartsWith extends string, 
TIf extends Narrowable, 
TElse extends Narrowable
>(
  /** the string literal _start value_ which a string must begin with */
  start: TStartsWith,
  /** a mutation function when a value _does_ start with `TStartsWith` */
  doesStartWith: <T extends `${TStartsWith}${string}`>(input: T) => TIf,
  /** an optional mutation function */
  doesNotStartWith: <T extends string>(input: T) => TElse
) => <TTextValue extends string>(input: TTextValue) =>
  ifTrue(
    // condition
    startsWith(start)(input),
    // handlers
    () => doesStartWith(input as TTextValue & `${TStartsWith}${string}`),
    () => doesNotStartWith(input as TTextValue)
  ) as IfTrue<
    StartsWith<TTextValue, TStartsWith>, 
    TIf, 
    TElse
  >;
