import { AnyObject,  ExplicitlyEmptyObject, ObjectKey } from "base-types";
import { IsWideContainer } from "boolean-logic";
import { ObjectToTuple } from "./ObjectToTuple";
import { AsString } from "./AsString";
import { Join, Surround } from "string-literals";

type Prefix<T extends boolean> = T extends true
? "\n  "
: "";

type Process<
  T extends readonly Record<ObjectKey, any>[],
  E extends boolean
> = Join<{
  [K in keyof T]: T[K] extends Record<infer Key extends string,infer Value>
    ? `${Prefix<E>}${Key}: ${AsString<Value>}`
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
  TObj extends AnyObject,
  TExpand extends boolean = false
> = TObj extends ExplicitlyEmptyObject
? "{}"
: IsWideContainer<TObj> extends true
? string
: Surround<
    Process< ObjectToTuple<TObj, true> , false>,
    TExpand extends false ? "{ " : "{",
    TExpand extends false ? " }" : "\n}"
  >;
