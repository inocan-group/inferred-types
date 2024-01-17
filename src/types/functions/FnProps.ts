/* eslint-disable @typescript-eslint/ban-types */
import { AnyFunction,  ExpandRecursively, IfNever } from "src/types/index";

/**
 * **FnProps**`<T>`
 * 
 * Return a dictionary of key/value pairs from a function. If no key/value
 * pairs are assigned to the function base then an empty object is returned.
 */
export type FnProps<T extends AnyFunction> = 
IfNever<
  ExpandRecursively<keyof T>,
  {},
  ExpandRecursively<Pick<T, ExpandRecursively<keyof T>>>
>;

