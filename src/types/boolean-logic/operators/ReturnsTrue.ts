import { AnyFunction } from "../..";


/**
 * **ReturnsTrue**`<T>`
 * 
 * Type utility which indicates whether the _return value_ of `T` is 
 * a `true` value. Return value are always either `true` or `false`.
 * 
 * Note: any non-functions passed in as `T` are always a **false** value
 * and so is a `boolean` value
 */
export type ReturnsTrue<T> = T extends AnyFunction
  ? ReturnType<T> extends true
    ? true
    : false
  : false;
