import { LogicFunction } from "src/types/functions/LogicFunction";
import { ifBoolean } from "../type-checks";
import { ifFunction } from "../type-checks/ifFunction";

export function logicalReturns<
  TConditions extends readonly (boolean | LogicFunction<TParams>)[],
  TParams extends readonly any[] = []
>(conditions: TConditions, ...params: TParams) {
  
  return conditions.map(c => ifBoolean(
    c, 
    v => v, 
    v => ifFunction(v, <F extends LogicFunction<TParams>>(fn: F) => fn(...params), () => null)
  ));

}
