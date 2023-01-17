import { Constant } from "src/types/constants/Constant";
import { Narrowable } from "src/types/Narrowable";
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
  return <
    TValue extends Narrowable
  >(value: TValue): value is TValue & Constant<TKind> => {
    return isConstant(value) && isEqual(value.kind)(kind) ? true : false;
  };
}
