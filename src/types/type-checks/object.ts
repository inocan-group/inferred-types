import { FunctionType } from "../FunctionType";
import { Mutable } from "../Mutable";

/**
 * **IsObject**
 *
 * Boolean type utility used to check whether a type `T` is an object
 */
export type IsObject<T> = Mutable<T> extends Record<string, any>
  ? // an object of some type
    T extends FunctionType
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
export type IfObject<T, IF, ELSE> = IsObject<T> extends true ? IF : ELSE;
