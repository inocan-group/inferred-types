import {  Narrowable } from "src/types";
import { IfObject, IsObject } from "src/types/boolean-logic";


/**
 * **isObject**()
 * 
 * Detects whether the passed in `v` is of type "object" where an object
 * is defined to be a string keyed dictionary style object. This means that
 * arrays are excluded, as well as functions which also have properties hanging
 * off of them.
 */
export function isObject<T extends Narrowable>(i: T): IsObject<T> {
  return (typeof i === "object" && i !== null && Array.isArray(i) === false) as IsObject<T>;
}

export function ifObject<T extends Narrowable, IF extends Narrowable, ELSE extends Narrowable>(
  val: T,
  ifObj: IF,
  notObj: ELSE
): IfObject<T, IF, ELSE> {
  return (isObject(val) ? ifObj : notObj) as IfObject<T, IF, ELSE>;
}
