import {  IfSoftTrue } from "src/types/boolean-logic";
import { Narrowable } from "src/types/Narrowable";
import { isTrue } from "../type-guards/isTrue";

/**
 * **ifTrue**
 *
 * Strongly type-aware conditional statement which checks whether a value is
 * _true_. Valid outcomes are:
 * 
 * - **IF** - returned when T is narrowly typed as `true`
 * - **ELSE** - returned when T is narrowly typed as `false`
 * - **IF | ELSE** - returned when T is a `boolean` type
 */
export function ifTrue<T extends boolean, IF extends Narrowable, ELSE extends Narrowable>(
  val: T,
  ifVal: <V extends T & true>(val: V) => IF,
  elseVal: <V extends Exclude<T, true>>(val: V) => ELSE
) {
  return (
    //
    isTrue(val) 
    ? ifVal(val as T & true) 
    : elseVal(val as Exclude<T, true>)
  ) as IfSoftTrue<T, IF, ELSE, IF | ELSE, IF | ELSE>;
}
