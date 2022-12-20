import { LogicFunction } from "../functions/LogicFunction";
import { ReturnTypes } from "../lists";
import { Narrowable } from "../Narrowable";
import { NarrowlyContains } from "./array";

/**
 * **Or**`<TConditions, TParams>`
 * 
 * Allows an array of conditions which are either ARE a boolean value or a 
 * function which evaluates to a boolean value to be logically AND'd together.
 */
export type Or<
  // eslint-disable-next-line no-use-before-define
  TConditions extends readonly (boolean | LogicFunction<TParams>)[],
  TParams extends readonly any[] = []
> = NarrowlyContains<true, TConditions> extends true
    ? // if a true value is found anywhere, the result is true
      true
    : // if the return type of  LogicFunction is true anywhere, the result is true
      NarrowlyContains<true, ReturnTypes<TConditions>> extends true
        ? true
        : // if boolean value found we need to defer to runtime
          NarrowlyContains<boolean, TConditions> extends true
          ? boolean
          : // if boolean return value found we need to defer to runtime
            NarrowlyContains<boolean, ReturnTypes<TConditions>> extends true
            ? boolean
            : // if false found after not finding other boolean types it is false
              NarrowlyContains<false, TConditions> extends true
              ? false
              : // same applies if return value is false
                NarrowlyContains<false,  ReturnTypes<TConditions>> extends true
                ? false
                : // logical operation is not permitted if there are no boolean types
                  never;

/**
 * **IfOr**`<TConditions, IF, ELSE, [TParams]>`
 * 
 * Type utility which converts a set conditions [`TConditions`] to the type `IF` _if_ any
 * of the conditions evaluate to `true`, otherwise to the type `ELSE`.
 * 
 * If you are evaluating functions which have params you can also specify the `TParams`
 * param which will try to use this to help narrow types where possible.
 */
export type IfOr<
  TConditions extends readonly (boolean | LogicFunction<TParams>)[],
  IF extends Narrowable,
  ELSE extends Narrowable,
  TParams extends readonly any[] = [],
> = Or<TConditions> extends true ? IF : ELSE;