/* eslint-disable no-use-before-define */
import { LogicFunction } from "../../functions/LogicFunction";
import { ReturnTypes } from "../../lists";
import { NarrowlyContains } from "../NarrowlyContains";

/**
 * **Or**`<TConditions, TParams>`
 * 
 * Allows an array of conditions which are either ARE a boolean value or a 
 * function which evaluates to a boolean value to be logically AND'd together.
 */
export type Or<
  // eslint-disable-next-line no-use-before-define
  TConditions extends readonly (boolean | LogicFunction<TParams>)[],
  TParams extends readonly unknown[] = []
> = NarrowlyContains<TConditions, true> extends true
    ? // if a true value is found anywhere, the result is true
      true
    : // if the return type of  LogicFunction is true anywhere, the result is true
      NarrowlyContains<ReturnTypes<TConditions>, true> extends true
        ? true
        : // if boolean value found we need to defer to runtime
          NarrowlyContains<TConditions, boolean> extends true
          ? boolean
          : // if boolean return value found we need to defer to runtime
            NarrowlyContains<ReturnTypes<TConditions>, boolean> extends true
            ? boolean
            : // if false found after not finding other boolean types it is false
              NarrowlyContains<TConditions, false> extends true
              ? false
              : // same applies if return value is false
                NarrowlyContains<ReturnTypes<TConditions>, false> extends true
                ? false
                : // logical operation is not permitted if there are no boolean types
                  never;


