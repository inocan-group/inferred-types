 
import { Constant } from "src/constants/index";
import { isObject } from "./isObject";
import { isEqual } from "./higher-order/isEqual";
import { isTypeOf } from "./higher-order/isTypeOf";


export function isConstant<
  K extends string
>(value: unknown): value is Constant<K> {
  return isObject(value) && "_type" in value && isTypeOf("string")((value as any)._type) && isEqual((value as any)._type)("Constant")  ? true : false;
}

