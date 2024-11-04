import {
  AfterFirst,
  First,
  IfEqual,
  IsEqual,
  LogicFunction,
  LogicalReturns,
  NarrowlyContains
} from "@inferred-types/types";

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
 * **And**`<TConditions, [TEmpty]>`
 *
 * Allows an array of conditions which are either ARE a boolean value or a
 * function which evaluates to a boolean value to be logically AND'd together.
 */
export type And<
  TConditions,
  TEmpty extends boolean = false
> = TConditions extends readonly (boolean | LogicFunction)[]

? IsEqual<TConditions,[]> extends true
? TEmpty
: LogicalReturns<TConditions> extends readonly boolean[]
  ? Process<
      LogicalReturns<TConditions>,
      NarrowlyContains<LogicalReturns<TConditions>,boolean>
    >
  : never
: never;

