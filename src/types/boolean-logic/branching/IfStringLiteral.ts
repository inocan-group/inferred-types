import { IfNever, IsStringLiteral } from "src/types/index";

/**
 * **IfStringLiteral**
 *
 * Branch utility which returns `IF` type when `T` is a string 
 * literal and `ELSE` otherwise
 */
export type IfStringLiteral<
  T, 
  IF = T, 
  ELSE = T
> = IfNever<
  T,
  ELSE,
  [IsStringLiteral<T>] extends [true]
  ? IF
  : ELSE
>;

/**
 * **IfNotStringLiteral**
 *
 * Branch utility which returns `IF` type when `T` is **not** a string 
 * literal and `ELSE` otherwise
 */
export type IfNotStringLiteral<  
  T, 
  IF = T, 
  ELSE = T
> = IfNever<
  T,
  IF,
  [IsStringLiteral<T>] extends [true]
    ? ELSE
    : IF
>;
