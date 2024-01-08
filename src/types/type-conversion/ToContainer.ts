/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  AnyArray, 
  AnyFunction,  
  AnyObject,  
  Scalar, 
  IfEqual, 
  IfNever 
} from "..";

/**
 * **ToContainer**`<T>`
 * 
 * Provides a narrowing feature for union types which _include_ the
 * option to be a `Container` but might also be a Scalar value or 
 * a function.
 * 
 * However, unlike a simple intersection with `readonly any[] | AnyObject`,
 * this type will detect where there is no overlap and instead of returning
 * a `never` value it will just convert to `AnyObject | AnyArray`:
 * 
 * If the union of `T` with `Exclude<T, Scalar| undefined | AnyFunction>`
 * - is a _container_ than we're done we simply apply the Exclude and return the type
 * - is a **Scalar** value or _undefined_ we just convert to the generic `AnyObject | AnyArray`
 * - if we resolve to `unknown` or `any` then all we can logically do is wrap it into a readonly array (e.g. `[unknown]` or `[any]` respectively).
 */
export type ToContainer<T> = IfNever<
  Exclude<T, Scalar | undefined | AnyFunction>, 
  AnyObject | AnyArray,
  // all non-never values
  IfEqual<
    Exclude<T, Scalar | undefined | AnyFunction>, any,
    [any],
    IfEqual<
    Exclude<T, Scalar | undefined | AnyFunction>, unknown,
    [unknown],
    Exclude<T, Scalar | undefined | AnyFunction>
    >
  >

>;
