import type { AnyObject, RemoveFromList, ErrorCondition } from "src/types";

/**
 * **RemoveErrors**`<TValue, [TErrKind]>`
 * 
 * Type utility which removes `ErrorCondition` values in a list.
 * 
 * - by default removes all errors
 * - if you specify `TErrKind` you can remove only errors of particular kind
 */
export type RemoveErrors<
  TValue extends unknown[] | readonly unknown[] | AnyObject,
  TErrKind extends string = string
> = 
TValue extends unknown[]
  ? RemoveFromList<TValue, "extends", ErrorCondition<TErrKind>>
  : TValue extends readonly unknown[]
      ? Readonly<RemoveFromList<TValue, "extends", ErrorCondition<TErrKind>>>
      : TValue extends AnyObject
        ? TValue
        : never;
