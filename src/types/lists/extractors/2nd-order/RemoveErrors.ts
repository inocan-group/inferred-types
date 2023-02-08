import { ErrorCondition } from "../../../../runtime/literals/ErrorCondition";
import {  AnyObject } from "../../..";
import { RemoveFromList } from "../RemoveFromList";

/**
 * **RemoveErrors**`<TValue, [TErrKind]>`
 * 
 * Type utility which removes `ErrorCondition` values in a list.
 * 
 * - by default removes all errors
 * - if you specify `TErrKind` you can remove only errors of particular kind
 */
export type RemoveErrors<
  TValue extends any[] | readonly any[] | AnyObject,
  TErrKind extends string = string
> = TValue extends any[]
? RemoveFromList<TValue, "extends", ErrorCondition<TErrKind>>
: TValue extends readonly any[]
? Readonly<RemoveFromList<TValue, "extends", ErrorCondition<TErrKind>>>
: TValue extends AnyObject
? any
: never;
