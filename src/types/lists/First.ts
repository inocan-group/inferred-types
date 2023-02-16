import { IfLength } from "../boolean-logic/IfLength";

/**
 * **First**`<T>`
 * 
 * Returns the _first_ type in a list
 */
export type First<T extends readonly unknown[]> =
  T[0] extends T[number] ? T[0] : never;

/**
 * **FirstOrElse**`<T,E>`
 * 
 * Returns the _first_ type in a list but if there are no elements then 
 * it will return `E` (which defaults to _undefined_).
 */
export type FirstOrElse<
  T extends readonly unknown[], 
  E = undefined
> = IfLength<T, 0, E, First<T>>;



