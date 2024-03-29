/* eslint-disable no-use-before-define */
import { LogicFunction, Or } from "src/types/index";


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
  TConditions extends (readonly (boolean | LogicFunction<TParams>)[])
    | (boolean | LogicFunction<TParams>)[],
  IF = true,
  ELSE = false,
  TParams extends readonly unknown[] = [],
> = Or<readonly [...TConditions]> extends true ? IF : ELSE;
