/* eslint-disable @typescript-eslint/ban-types */
import { AnyFunction, AnyObject } from "src/types";

/**
 * **FnProps**`<T>`
 * 
 * Return a dictionary of key/value pairs from a function. If no key/value
 * pairs are assigned to the function base then an empty object `{}` is returned.
 */
export type FnProps<T extends AnyFunction> = T extends AnyObject
  ? {
    [K in keyof T]: T[K]
  }
  : {};
