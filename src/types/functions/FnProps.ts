/* eslint-disable @typescript-eslint/ban-types */
import { 
  AnyFunction,  
  EmptyObject,  
  ExpandRecursively, 
  IfNever, 
  ObjectKey 
} from "src/types/index";



/**
 * **FnProps**`<T>`
 * 
 * Return a dictionary of key/value pairs from a function. If no key/value
 * pairs are assigned to the function base then an empty object is returned.
 */
export type FnProps<
  T extends AnyFunction
> = IfNever<
  ExpandRecursively<keyof T>,
  EmptyObject,
  keyof T extends ObjectKey
    ? Pick<T, keyof T>
  : never
> extends Record<keyof T, unknown>
  ? IfNever<
      keyof T,
      EmptyObject,
      keyof T extends ObjectKey
        ? Pick<T, keyof T>
        : never
    >
: never;

