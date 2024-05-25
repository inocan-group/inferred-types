 
import { Container, Contains, IsNever, Dictionary, Keys } from "src/types/index";

type Process<T extends Container> = T extends Generator
  ? true
  : T extends Map<any, any>
  ? true
  : T extends WeakMap<any, any>
  ? true
  : T extends Set<any>
  ? true
  : T extends readonly any[]
  ? true
  : T extends Dictionary
  ? Contains<Keys<T>, Iterator<T>> extends true
    ? true
    : false
  : false;


/**
 * **IsIterable**`<T>`
 * 
 * Boolean operator which tests whether `T` is iterable.
 */
export type IsIterable<
  T,
  TNever = never
> = IsNever<T> extends true
? TNever
: T extends Container
  ? Process<T>
  : false;


