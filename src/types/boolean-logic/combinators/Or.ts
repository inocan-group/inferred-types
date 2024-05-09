/* eslint-disable no-use-before-define */
import { LogicFunction, NarrowlyContains, LogicalReturns, IfNever, IfEqual  } from "src/types/index";

type Process<
  TConditions extends readonly boolean[],
  TBooleanSean extends boolean
> = NarrowlyContains<TConditions, true> extends true
? true
: IfEqual<TBooleanSean, true, boolean, false>;

/**
 * **Or**`<TConditions, TParams>`
 * 
 * Allows an array of conditions which are either ARE a boolean value or a 
 * function which evaluates to a boolean value to be logically AND'd together.
 */
export type Or<
  TConditions ,
  _TParams extends readonly unknown[] = []
> = IfNever<TConditions extends readonly (boolean | LogicFunction)[]
? LogicalReturns<TConditions> extends readonly boolean[]
  ? Process<
      LogicalReturns<TConditions>,
      NarrowlyContains<LogicalReturns<TConditions>, boolean>
    >
  : never
: false,
false
>
