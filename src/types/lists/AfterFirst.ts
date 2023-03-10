import { Tuple } from "../base-types";

/**
 * **AfterFirst**`<T>`
 *
 * returns the elements in an array _after_ the first element
 */
export type AfterFirst<T extends Tuple | readonly []> = 
  T extends readonly [unknown, ...unknown[]]
  ? T extends readonly [unknown, ...infer Rest] ? readonly [...Rest] : never
  : T extends unknown[]
    ? []
    : T extends [unknown, ...infer Rest]
      ? Rest
      : [];
