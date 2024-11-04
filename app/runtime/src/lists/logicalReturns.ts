import { LogicFunction, LogicalReturns } from "@inferred-types/types";
import { isBoolean, isFunction } from "@inferred-types/runtime";
import { Never } from "@inferred-types/constants";


export function logicalReturns<
  TConditions extends readonly (boolean | LogicFunction)[],
>(conditions: TConditions) {

  return conditions.map(c => isBoolean(c)
    ? c
    : isFunction(c)
      ? c()
      : Never
  ) as unknown as LogicalReturns<TConditions>;

}

