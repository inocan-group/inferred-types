/* eslint-disable no-use-before-define */
import { LogicFunction } from "../functions/LogicFunction";
import { Narrowable } from "../Narrowable";
import {  IfTrue, IsFalse, IsTrue, ReturnsFalse, ReturnsTrue } from "./boolean";
import { IfOr } from "./Or";

/**
 * **And**`<TConditions, [TParams]>`
 * 
 * Allows an array of conditions which are either ARE a boolean value or a 
 * function which evaluates to a boolean value to be logically AND'd together.
 */
export type And<
  // eslint-disable-next-line no-use-before-define
  TConditions extends readonly (boolean | LogicFunction<TParams>)[], 
  TParams extends readonly any[] = [],
  TMaybe extends boolean = false
> = [...TConditions] extends [infer First, ...infer Rest]
  ? IfOr<
      [ IsTrue<First>, ReturnsTrue<First> ],
      // good so far; recurse to test next condition
      Rest extends readonly (boolean | LogicFunction<TParams>)[]
        ? And<Rest, TParams, TMaybe>
        : never,
      // if it's false we're done but we may have a boolean type
      IfOr<
        [ IsFalse<First>, ReturnsFalse<First> ],
        false,
        // recurse but set Maybe flag
        Rest extends readonly (boolean | LogicFunction<TParams>)[]
          ? And<Rest, TParams, true>
          : never,
        TParams
      >,
      TParams
    >
  : IfTrue<TMaybe, boolean, true>;

/**
 * **IfAnd**`<TConditions[], [IF], [ELSE], [TParams]>`
 * 
 * Takes an array of _conditions_ and if all of them evaluate to `true`
 * then the `IF` type is returned otherwise the `ELSE` type.
 * 
 * By default `IF` is **true** and `ELSE` is **false**.
 */
export type IfAnd<
  TConditions extends readonly (boolean | LogicFunction<TParams>)[],
  IF extends Narrowable = true,
  ELSE extends Narrowable = false,
  TParams extends readonly any[] = readonly [],
> = And<TConditions> extends true ? IF : ELSE; 
  
