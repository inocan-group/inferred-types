import { Tuple } from "../base-types";


export type Process<T> = T extends string | number | symbol 
? T & PropertyKey
: never;

export type ProcessEach<T extends Tuple> = {
  [K in keyof T]: Process<T[K]>
}
/**
 * **AsPropertyKey**`<T>`
 * 
 * Ensures that `T` is a property key or, if a tuple is passed in, that
 * all values extend `PropertyKey`
 */
export type AsPropertyKey<T> = T extends Tuple
  ? ProcessEach<T>
  : Process<T>;
