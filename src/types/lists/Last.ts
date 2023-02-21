import { Decrement } from "../numeric-literals";
import { Length } from "./Length";

/**
 * **Last**`<T>`
 * 
 * Returns the _last_ type in a list
 */
export type Last<T extends readonly unknown[]> =
  T[0] extends T[number] ? T[Decrement<Length<T>>]: never;
