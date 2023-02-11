import { Narrowable } from "../literals/Narrowable";
import { IsObject } from "./IsObject";

/**
 * **IfObject**
 *
 * Branch type utility with return `IF` when `T` extends an object type
 * and `ELSE` otherwise
 */
export type IfObject<T, IF extends Narrowable, ELSE extends Narrowable> = IsObject<T> extends true
  ? IF
  : ELSE;
