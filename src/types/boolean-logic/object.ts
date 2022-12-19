import { AnyFunction } from "src/runtime";
import { Mutable } from "../Mutable";
import { Narrowable } from "../Narrowable";

/**
 * **IsObject**
 *
 * Boolean type utility used to check whether a type `T` is an object
 */
export type IsObject<T> = Mutable<T> extends Record<string, any>
  ? // an object of some type
    T extends AnyFunction
    ? // when a function with props is found, categorize as a function not object
      false
    : Mutable<T> extends any[]
    ? // Array's are objects too but in our narrower definition we're looking only
      // dictionary based arrays.
      false
    : true
  : false;

/**
 * **IfObject**
 *
 * Branch type utility with return `IF` when `T` extends an object type
 * and `ELSE` otherwise
 */
export type IfObject<T, IF extends Narrowable, ELSE extends Narrowable> = IsObject<T> extends true
  ? IF
  : ELSE;
