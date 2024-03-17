/* eslint-disable no-use-before-define */
import { LogicFunction } from "src/types/index";
import { ifBoolean, ifFunction } from "../boolean-logic";


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

