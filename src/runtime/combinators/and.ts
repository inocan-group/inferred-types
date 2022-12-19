import { And } from "src/types/boolean-logic/And";
import { LogicFunction } from "src/types/functions";

/**
 * Groups a number of "logic functions" together by combining their results using
 * the logical **AND** operator
 */
export const and = <
// eslint-disable-next-line no-use-before-define
TValues extends readonly (boolean | LogicFunction<TParams>)[],
TParams extends readonly any[] =  readonly[]
>(values: TValues, params?: TParams) => {
  return values.map(v => typeof v === "function" 
    ? params ? v(...params) : (v as Function)() 
    : v
  ).every(i => i === true) as And<TValues, TParams>;
};
