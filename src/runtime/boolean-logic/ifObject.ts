
import type { Narrowable } from "src/types";
import { IfObject } from "src/types/boolean-logic/IfObject";
import { isObject } from "../type-guards";

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
