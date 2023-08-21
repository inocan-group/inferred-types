import {   Matcher, TypeComparisonHandler, TypeComparisonOp } from "src/types";
import { KindApi, kind} from "src/runtime";

export const createTypeComparison = <
  TOp extends TypeComparisonOp,
  TRefTypeCb extends (cb: KindApi) => unknown,
  THandler extends TypeComparisonHandler = "throw"
>(op: TOp, refType: TRefTypeCb, handler?: THandler) => {
  return [
    op, 
    refType(kind), 
    handler || "throw"
  ] as unknown as Matcher<TOp, ReturnType<TRefTypeCb>, THandler>;
};
