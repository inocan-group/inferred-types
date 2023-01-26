import { LogicFunction } from "types/functions/LogicFunction";
import { ifBoolean } from "../boolean-logic";
import { ifFunction } from "../boolean-logic/ifFunction";

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

