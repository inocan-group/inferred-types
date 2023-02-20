import { IsObject } from "src/types/boolean-logic";

/**
 * **IfObject**
 *
 * Branch type utility with return `IF` when `T` extends an object type
 * and `ELSE` otherwise
 */
export type IfObject<T, IF, ELSE> = IsObject<T> extends true
  ? IF
  : ELSE;
