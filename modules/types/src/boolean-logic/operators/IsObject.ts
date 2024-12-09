import type { AnyFunction, Extends, If, Mutable, Or } from "inferred-types/types";

/**
 * **IsObject**
 *
 * Boolean type utility used to check whether a type `T` is an object
 * (aka, it extends `Record<string, any>` or a readonly equivalent)
 */
export type IsObject<T> = Or<[
  If<Extends<T, Record<string | symbol, unknown>>, true, false>,
  If<Extends<Mutable<T>, Record<string | symbol, unknown>>, true, false>,
  If<Extends<T, object>, true, false>,
]> extends true
  ? // an object of some type
  T extends AnyFunction
    ? // when a function with props is found, categorize as a function not object
    false
    : Mutable<T> extends unknown[]
      ? // Array's are objects too but in our narrower definition we're looking only
    // dictionary based arrays.
      false
      : true
  : false;
