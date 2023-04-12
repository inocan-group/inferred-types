import type { IfObject, Narrowable } from "src/types";
import { isObject } from "src/runtime";

export function ifObject<
  T extends Narrowable, 
  IF extends Narrowable, 
  ELSE extends Narrowable
>(
  val: T,
  ifObj: IF,
  notObj: ELSE
): IfObject<T, IF, ELSE> {
  return (isObject(val) ? ifObj : notObj) as IfObject<T, IF, ELSE>;
}
