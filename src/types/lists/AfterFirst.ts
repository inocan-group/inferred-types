import { Tuple } from "inferred-types/dist/types/index";

/**
 * **AfterFirst**`<T>`
 *
 * returns the elements in an array _after_ the first element
 */
export type AfterFirst<T extends Tuple > =
  T extends readonly [unknown, ...unknown[]]
  ? T extends readonly [unknown, ...infer Rest] ? readonly [...Rest] : never
  : T extends unknown[]
    ? []
    : T extends [unknown, ...infer Rest]
      ? Rest
      : [];
