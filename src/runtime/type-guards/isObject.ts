import {  Narrowable } from "src/types";
import { AnyObject, IfObject } from "src/types/boolean-logic";


/**
 * **isObject**(value)
 * 
 * Type guard used to detect whether the passed in value is an Object.
 */
export function isObject<T extends AnyObject>(value: unknown): value is T  {
  return typeof value === "object" && value !== null && Array.isArray(value) === false;
}

export function ifObject<T extends Narrowable, IF extends Narrowable, ELSE extends Narrowable>(
  val: T,
  ifObj: IF,
  notObj: ELSE
): IfObject<T, IF, ELSE> {
  return (isObject(val) ? ifObj : notObj) as IfObject<T, IF, ELSE>;
}
