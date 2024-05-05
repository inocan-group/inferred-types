import { Tuple } from "../base-types";
import { ToString } from "./ToString";

/**
 * **ToStringArray**`<T>`
 * 
 * Receives a tuple of values and converts each item
 * into a _string_ value using the `ToString<T>` utility.
 */
export type ToStringArray<T extends Tuple> = {
  [K in keyof T]: ToString<T[K]>
}
