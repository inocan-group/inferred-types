import { AnyArray, AnyFunction,  AnyObject,  Scalar } from "src/types/base-types";
import { IfNever } from "src/types/boolean-logic";

/**
 * **ToContainer**`<T>`
 * 
 * Provides a narrowing feature for union types which _include_ the
 * option to be a `Container` but might also be a Scalar value or 
 * a function.
 * 
 * However, unlike a simple intersection with `readonly any[] | AnyObject`,
 * this type will detect where there is no overlap and instead of returning
 * a `never` value it will just convert to `AnyObject | AnyArray`.
 */
export type ToContainer<T> = IfNever<
  Exclude<T, Scalar | undefined | AnyFunction>, 
  AnyObject | AnyArray,
  Exclude<T, Scalar | undefined | AnyFunction>
>;
