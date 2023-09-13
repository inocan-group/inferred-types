/* eslint-disable no-use-before-define */
import { LogicFunction } from "../../types/base";
import { ifBoolean, ifFunction } from "src/runtime";

export function logicalReturns<
  TConditions extends readonly (boolean | LogicFunction<TParams>)[],
  TParams extends readonly unknown[] = []
>(conditions: TConditions, ...params: TParams) {
  
  return conditions.map(c => ifBoolean(
    c, 
    v => v, 
    v => ifFunction(v, <F extends LogicFunction<TParams>>(fn: F) => fn(...params), () => null)
  ));

}

