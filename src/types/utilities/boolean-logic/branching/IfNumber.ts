import { IsNumber } from "src/types";
/**
 * **IfNumber**`<T,IF,ELSE>`
 * 
 * Type branching utility which returns `IF` type when `T` is
 * a number type (wide or narrow).
 */
export type IfNumber<T, IF, ELSE> = IsNumber<T> extends true
  ? IF 
  : ELSE;
