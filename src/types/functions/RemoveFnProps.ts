import { AnyFunction, AsFnMeta } from "src/types/index";

/**
 * **RemoveFnProps**`<T>`
 * 
 * Takes a function `T` and returns the function unchanged but without any
 * key/value pairs that may have been added to the function's definition.
 */
export type RemoveFnProps<
  T extends AnyFunction
> = (...args: AsFnMeta<T>["args"]) => AsFnMeta<T>["returns"];
