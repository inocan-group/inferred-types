import { LogicFunction } from "../functions/LogicFunction";

/**
 * **And**`<TConditions, TParams>`
 * 
 * Allows an array of conditions which are either ARE a boolean value or a 
 * function which evaluates to a boolean value to be logically AND'd together.
 */
export type And<
  // eslint-disable-next-line no-use-before-define
  TConditions extends readonly (boolean | LogicFunction<TParams>)[], 
  TParams extends readonly any[] = []
> = TConditions extends readonly (true | ReturnType<LogicFunction<TParams>>)[]
  ? true
  : TConditions extends readonly (false | (() => false))[]
    ? false
    : boolean;