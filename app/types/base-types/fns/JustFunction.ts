import { TypedFunction } from "./TypedFunction";

/**
 * **JustFunction**`<T>`
 * 
 * Type utility which strips off any dictionary properties that may have existed
 * on the function passed in as `T` and leaves just the pure function signature.
 */
export type JustFunction<
  TFn extends TypedFunction
> = <T extends readonly unknown[]>(...args: T & Parameters<TFn>) => ReturnType<TFn>;
