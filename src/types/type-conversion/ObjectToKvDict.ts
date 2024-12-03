import {
  AfterFirst,
  AnyObject,
  As,
  ExplicitlyEmptyObject,
  First,
  IsWideContainer,
  Keys,
  KeyValue,
  ObjectKey,
} from "inferred-types/types";

type Process<
  TSource extends AnyObject,
  TKeys extends readonly (ObjectKey & keyof TSource)[],
  TTuple extends readonly KeyValue[] = []
> = [] extends TKeys
? TTuple
: Process<
    TSource,
    AfterFirst<TKeys>,
    [ ...TTuple, { key: First<TKeys>, value: TSource[First<TKeys>] } ]
  >;


/**
 * **ObjectToTuple**`<TObj>`
 *
 * Type utility to convert an object to an array of object based key-value pairs.
 *
 * Example:
 * ```ts
 * // readonly [ {key: "foo", value: 1} ]
 * type T = ObjectToTuple<{ foo: 1 }>
 * ```
 */
export type ObjectToTuple<
  TObj extends AnyObject
> = TObj extends ExplicitlyEmptyObject
? []
: IsWideContainer<TObj> extends true
? KeyValue[]
: Process<TObj, As<Keys<TObj>, readonly (ObjectKey & keyof TObj)[] >>
