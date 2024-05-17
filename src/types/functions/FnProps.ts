/* eslint-disable @typescript-eslint/ban-types */
import { 
  AnyFunction,  
  ExpandRecursively, 
  IsEqual, 
  IsNever, 
  ObjectKey 
} from "src/types/index";

type Process<
  T extends AnyFunction
> = IsEqual<T, Function> extends true
? never
: IsNever<ExpandRecursively<keyof T>> extends true
  ? never
  : keyof T extends ObjectKey
    ? Pick<T, keyof T>
    : never;

/**
 * **FnProps**`<T>`
 * 
 * Return a dictionary of key/value pairs from a function. If no key/value
 * pairs are assigned to the function base then an empty object is returned.
 */
export type FnProps<
  T extends AnyFunction
> = Process<T>;

