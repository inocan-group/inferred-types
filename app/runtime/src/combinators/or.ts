import type { Or } from "src/types/index";

/**
 * **or**(conditions) -> boolean
 * 
 * If you have a discrete list of boolean values then you can use this
 * function to perform a logical OR operation on them.
 */
export function or<TList extends readonly boolean[]>(...conditions: TList) {
  const values: unknown = conditions.some((v: boolean) => v === true ? true : false);

  return values as Or<TList>;
}
