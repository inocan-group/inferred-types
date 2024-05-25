 
import {  Narrowable, Widen } from "src/types/index";


/**
 * **widen**(value)
 * 
 * Runtime utility which takes any _type_ and ensures it's widened to a wide
 * type of passed in value is a literal.
 */
export function widen<T extends Narrowable>(value: T): Widen<T> {
  return value as Widen<T>;
}
