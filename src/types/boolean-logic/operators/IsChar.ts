import {  IfStringLiteral, Length } from "src/types";

/**
 * **IsChar**`<T>`
 * 
 * Boolean operator which returns true/false/boolean based on whether `T` is a
 */
export type IsChar<T> = T extends string
  ? Length<T> extends 1
    ? true
    : IfStringLiteral<T, false, boolean>
  : false;
