import { AnyObject } from "src/types/base-types";
import { IfNever } from "src/types/boolean-logic";

/**
 * **ToContainer**`<T>`
 * 
 * Intersects `T` with `AnyObject | readonly unknown[]` to ensure that
 * resultant type is a Container but if the intersection results in a 
 * _never_ value then it will convert it to an empty object.
 */
export type ToContainer<T> = IfNever<
  T & (AnyObject | readonly unknown[]), 
  object,
  T & (AnyObject | readonly unknown[])
>;
