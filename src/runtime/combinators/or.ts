import { Or } from "src/types/boolean-logic/Or";

/**
 * **or**(conditions) -> boolean
 * 
 * If you have a discrete list of boolean values then you can use this
 * function to perform a logical OR operation on them.
 */
export function or<TList extends readonly boolean[]>(...conditions: TList) {
  return (conditions.some((v) => v === true) ? true : false) as Or<TList>;
}
