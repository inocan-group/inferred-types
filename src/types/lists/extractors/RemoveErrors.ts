import { ErrorCondition } from "src/runtime/literals/ErrorCondition";
import { AnyObject } from "src/types/boolean-logic";
import { ArrExtractor } from "./extractor";

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
? ArrExtractor<TValue, ErrorCondition<TErrKind>, true>
: TValue extends readonly any[]
? readonly [...ArrExtractor<TValue, ErrorCondition<TErrKind>, true>]
: TValue extends AnyObject
? any
: never;
