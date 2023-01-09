
import { Mutable } from "../type-conversion/Mutable";
import { Narrowable } from "../Narrowable";
import { IfExtends } from "./Extends";
import { Or } from "./Or";
import { AnyFunction } from "../functions/function-types";
import { Keys } from "../Keys";

export type AnyObject = Record<string, any>;

/**
 * **IsObject**
 *
 * Boolean type utility used to check whether a type `T` is an object
 */
export type IsObject<T> = Or<[
    IfExtends<T,Record<string, any>,true, false>,
    IfExtends<Mutable<T>,Record<string, any>,true, false>
]> extends true
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

/**
 * **IsEmptyObject**`<T>`
 * 
 * Type utility which detects an object type that has no keys defined.
 * 
 * Note: unlike the `IsObject<T>` utility, this utility doesn't care if
 * this object-like structure is intersected with a function. It's utility
 * is just to detect whether the object _part_ of the type has keys or not.
 */
export type IsEmptyObject<T> = T extends Record<string, any>
  ? Keys<T> extends []
    ? true
    : false
  : false;

