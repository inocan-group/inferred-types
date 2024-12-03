import { AnyObject,  ExplicitlyEmptyObject, ObjectKey } from "base-types";
import { IsWideContainer } from "boolean-logic";
import { ObjectToTuple } from "./ObjectToTuple";
import { AsString } from "./AsString";
import { Join, Surround } from "string-literals";

export type Process<
  T extends readonly Record<ObjectKey, any>[]
> = Join<{
  [K in keyof T]: T[K] extends Record<infer Key extends string,infer Value>
    ? `${Surround<Key, `"`, `"`>}: ${Value extends string ? `"${Value}"` : `${AsString<Value>}`}`
    : never
}, ", ">;


/**
 * **ObjectToJsonString**`<T>`
 *
 * Converts a Javascript object into a JSON string representation.
 *
 * **Related:** `ObjectToCssString`, `ObjectToJsString`, `ObjectToTuple`
 */
export type ObjectToJsonString<
  TObj extends AnyObject
> = TObj extends ExplicitlyEmptyObject
? "{}"
: IsWideContainer<TObj> extends true
? string
: Surround<
    Process< ObjectToTuple<TObj, true> >,
    "{ ",
    " }"
  >;
