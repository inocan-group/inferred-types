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
 * Receives an object and returns true/false based on whether
 * the type has required properties or not.
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

