import type {  AnyFunction } from "src/types/index";


/**
 * **IsFunction**`<T>`
 * 
 * Checks whether `T` is a function of _any_ kind and that includes
 * functions with dictionary props sitting alongside the function.
 */
export type IsFunction<T> = T extends AnyFunction ? true : false;
