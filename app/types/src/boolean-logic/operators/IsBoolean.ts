import {  WidenUnion, IsUnion } from "src/types/index";
/**
 * **IsBoolean**
 *
 * Boolean type utility which detects literal or wide boolean type.
 */
export type IsBoolean<T> = [IsUnion<T>] extends [true]
? [WidenUnion<T>] extends [boolean]
  ? true
  : [string] extends [WidenUnion<T>]
    ? boolean
    : false
: [T] extends [boolean] ? true : false;
