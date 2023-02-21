/* eslint-disable no-use-before-define */
import { Tuple } from "src/types/base-types";
import { LogicFunction } from "src/types/functions";
import { IfFalse, IfTrue, IsErrorCondition, IsErrorCondition, IsNever } from "src/types/boolean-logic";

type _Negate<
  T extends Tuple<boolean | LogicFunction>,
> = {
  [K in keyof T]: T[K] extends LogicFunction
    ? Not<ReturnType<T[K]>>
    : Not<T[K]>
};

/**
 * **Not**`<T>`
 * 
 * A boolean negation that can work on both a single value or an
 * array of values.
 * 
 * ```ts
 * // false
 * type Single = Not<true>;
 * // [ false, true, boolean ]
 * type Multi = Not<[true,false,boolean]>;
 * ```
 */
export type Not<T> = IsErrorCondition<T> extends true 
  ? T 
  : [T] extends [boolean]
    ? IfTrue<
      T, false, // invert true value
      IfFalse<T, true, boolean>
    >
: [T] extends [LogicFunction]
  ? Not<ReturnType<T>>
    : [T] extends [Tuple<boolean | LogicFunction>]
      ? _Negate<T>
      : never;

