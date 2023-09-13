import {   Matcher, TypeComparisonHandler, TypeComparisonOp } from "../../types/base";
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
