import {
  ObjectKey,
  RequiredKeysTuple,
  AnyObject,
  IsWideContainer,
  IsEqual,
  EmptyObject
} from "inferred-types/types";

/**
 * **HasRequiredProps**`<T>`
 *
 * Receives `T` and returns true/false based on whether
 * the `T` is an object _and_ has at least one required property on it.
 */
export type HasRequiredProps<
  T extends AnyObject
> = IsWideContainer<T> extends true
? IsEqual<T, EmptyObject> extends true ? false : boolean

: RequiredKeysTuple<T> extends readonly ObjectKey[]
  ? RequiredKeysTuple<T>["length"] extends 0
    ? false
    : true
  : false;
