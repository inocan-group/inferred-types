import { Constant } from "types/constants/Constant";
import { isEqual } from "./higher-order";
import { isTypeOf } from "./higher-order/isTypeOf";
import { isObject } from "./isObject";

export function isConstant<
  K extends string
>(value: unknown): value is Constant<K> {
  return isObject(value) && isTypeOf("string", value._type) && isEqual(value._type)( "Constant")  ? true : false;
}

export function isSpecificConstant<
  TKind extends string
>(kind: TKind) {
  return (value: unknown): value is Constant<TKind> => {
    return isConstant(value) && isEqual(value.kind)(kind) ? true : false;
  };
}
