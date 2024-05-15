/* eslint-disable no-use-before-define */
import {  
  AfterFirst, 
  First, 
  IfEqual,  
  IsEqual, 
  LogicFunction, 
  LogicalReturns, 
  NarrowlyContains 
} from "src/types/index";

type Process<
  TConditions extends readonly boolean[], 
  TBooleanSeen extends boolean,
> = [] extends TConditions
? IfEqual<TBooleanSeen, true, boolean, true>
: [First<TConditions>] extends [false]
  ? false
  : Process<
      AfterFirst<TConditions>,
      TBooleanSeen
    >;


/**
 * **And**`<TConditions, [TParams]>`
 * 
 * Allows an array of conditions which are either ARE a boolean value or a 
 * function which evaluates to a boolean value to be logically AND'd together.
 */
export type And<
  TConditions extends readonly (boolean | LogicFunction)[], 
  TEmpty extends boolean = false
> = IsEqual<TConditions,[]> extends true
? TEmpty
: LogicalReturns<TConditions> extends readonly boolean[]
  ? Process<
      LogicalReturns<TConditions>,
      NarrowlyContains<LogicalReturns<TConditions>,boolean>
    >
  : never;

