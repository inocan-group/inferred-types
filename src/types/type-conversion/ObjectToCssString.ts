import { AnyObject,  ExplicitlyEmptyObject, ObjectKey } from "base-types";
import { IsWideContainer } from "boolean-logic";
import { ObjectToTuple } from "./ObjectToTuple";
import { AsString } from "./AsString";
import { Join, Surround } from "string-literals";

type Process<
  T extends readonly Record<ObjectKey, any>[]
> = Join<{
  [K in keyof T]: T[K] extends Record<infer Key extends string,infer Value>
    ? `${Key}: ${AsString<Value>}`
    : never
}, "; ">;


/**
 * **ObjectToCssString**`<T>`
 *
 * Converts a Javascript object into a CSS representation.
 *
 * **Related:** `ObjectToJsString`, `ObjectToJsonString`, `ObjectToTuple`
 */
export type ObjectToCssString<
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
