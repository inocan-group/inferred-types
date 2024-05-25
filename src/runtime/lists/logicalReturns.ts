import { LogicFunction, LogicalReturns } from "src/types/index";
import { isBoolean, isFunction } from "src/runtime/index";
import { Never } from "src/constants/Never";


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

