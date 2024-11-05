
import {
  LogicFunction,
  NarrowlyContains,
  LogicalReturns,
  IsNever,
  IsEqual,
  Throw,
  ProxyError,
  ErrorCondition,
  IsErrorCondition
} from "inferred-types/dist/types/index";

type Process<
  TConditions extends readonly boolean[],
  TBooleanSean extends boolean
> = NarrowlyContains<TConditions, true> extends true
? true
: [IsEqual<TBooleanSean, true>] extends [true]
  ? boolean
  : false;

type ConditionError<TErr> = TErr extends ErrorCondition
? ProxyError<
  TErr,
  "Or",
  "TConditions"
>
: never;


/**
 * **Or**`<TConditions, [TEmpty]>`
 *
 * Allows an array of conditions (either a boolean value or a
 * function which evaluates to a boolean value) to be logically OR'd together.
 *
 * - by default if an empty tuple of conditions is passed in then this utility
 * resolves to `false` but this can be changed by modifying `TEmpty`
 *
 * **Related:** `And`
 */
export type Or<
  TConditions,
  TEmpty extends boolean = false
> = IsNever<TConditions> extends true
? Throw<
  "invalid-never",
  `Or<TConditions> received "never" for it's conditions!`,
  "Or"
  >
: IsEqual<TConditions,[]> extends true
  ? TEmpty
  : TConditions extends readonly (boolean | LogicFunction)[]
    ? LogicalReturns<TConditions> extends readonly boolean[]
      ? Process<
          LogicalReturns<TConditions>,
          NarrowlyContains<LogicalReturns<TConditions>, boolean>
        >
      : never
    : IsErrorCondition<TConditions> extends true
      ? ConditionError<TConditions>
      : Throw<
          "invalid-conditions",
          `The conditions passed to Or<TConditions> were invalid!`,
          "Or",
          { library: "inferred-types"; value: TConditions }
        >;

