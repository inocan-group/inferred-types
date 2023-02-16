/* eslint-disable no-use-before-define */
import { AnyFunction } from "src/types/base-types";
import { LogicFunction } from "../../functions/LogicFunction";
import { AfterFirst, First } from "../../lists";
import { Narrowable } from "../../literals";
import { IfNarrowlyContains } from "../IfNarrowlyContains";
import { IsFalse } from "../IsFalse";
import { IfOr } from "./Or";
import { ReturnsFalse } from "../ReturnsFalse";

type _And<
  TConditions extends readonly (boolean | LogicFunction<TParams>)[], 
  TParams extends readonly Narrowable[],
  TResults extends readonly boolean[] = [],
> = [] extends TConditions
? IfNarrowlyContains<TResults, boolean, boolean, true>
: IfOr<
    [ 
      IsFalse<First<TConditions>>, ReturnsFalse<First<TConditions>> 
    ],
    false, // false short circuits
    _And<
      AfterFirst<TConditions>,
      TParams,
      First<TConditions> extends boolean
        ? [...TResults, First<TConditions>]
        : First<TConditions> extends AnyFunction
          ? ReturnType<First<TConditions>> extends boolean 
            ? [...TResults, ReturnType<First<TConditions>>]
            : never
          : never
    >
  >;


/**
 * **And**`<TConditions, [TParams]>`
 * 
 * Allows an array of conditions which are either ARE a boolean value or a 
 * function which evaluates to a boolean value to be logically AND'd together.
 */
export type And<
  TConditions extends readonly (boolean | LogicFunction<TParams>)[], 
  TParams extends readonly Narrowable[] = [],
> = _And<TConditions, TParams>;
