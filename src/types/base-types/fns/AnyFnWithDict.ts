import { Dictionary, TypedFunction } from "../..";


/**
 * **AnyFnWithDict**
 * 
 * Allows you to easily express a function of _any_ parameters, 
 * _any_ return value, so long as the function has the properties 
 */
export type AnyFnWithDict<TDict extends Dictionary> = TypedFunction & TDict;
