import { IfStartsWith, StartsWith } from "src/types/type-checks";
import { IfUndefined } from "src/types/type-checks/IsUndefined";
import { createFnWithProps } from "../createFnWithProps";
import { box, Box } from "../literals";
import { ifTrue } from "./isTrue";

/**
 * **startsWith**
 *
 * A higher-order and type strong way to checking whether a string literal `<T>` starts with
 * another known string literal `<S>`:
 * ```ts
 * const answer = startsWith("foo")("foobar");
 * ```
 */
export const startsWith =
  <S extends string>(
    /** The starting string you will test for */
    start: S
  ) =>
  <T extends string>(
    /** The text being tested */
    input: T
  ): StartsWith<T, S> => {
    return input.startsWith(start) as StartsWith<T, S>;
  };

/**
 * **IfStartsWithFn**
 *
 * A function which comes from a partial application of the `ifStartsWith()`
 * utility. This type will receive a value `<T>` and _if_ this values starts
 * with `<S>` then the callback function will executed in a type strong manner.
 */
export type IfStartsWith__Fn<
  /** The "start with" constraint */
  TStartsWith extends string,
  TIf extends Box<<T extends string>(i: `${TStartsWith}${T}`) => any>,
  TElse extends Box<(<T extends string>(i: T) => any) | undefined>
> = <T extends string>(
  val: T
) => IfStartsWith<
  T, //
  TStartsWith,
  // Condition Passes
  ReturnType<TIf["value"]>,
  // Condition Fails
  IfUndefined<
    TElse, //
    undefined,
    Exclude<TElse, undefined>
  >
>;

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
export const ifStartsWith =
  <
    TStartsWith extends string,
    TIf extends <T extends string>(input: T) => any,
    TElse extends <T extends string>(input: T) => any
  >(
    /** the string literal _start value_ which a string must begin with */
    start: TStartsWith,
    /** a mutation function when a value _does_ start with `TStartsWith` */
    isTrue: TIf,
    /** an optional mutation function */
    isFalse: TElse
  ) =>
  <I extends string>(input: I) =>
    ifTrue(
      // condition
      startsWith(start)(input),
      isTrue(input),
      isFalse(input)
    ) as IfStartsWith<I, TStartsWith, ReturnType<TIf>, ReturnType<TElse>>;
