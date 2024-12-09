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

type Compact<
  TSource extends AnyObject,
  TKeys extends readonly (ObjectKey & keyof TSource)[],
  TTuple extends readonly Record<ObjectKey, any>[] = []
> = [] extends TKeys
? TTuple
: Compact<
    TSource,
    AfterFirst<TKeys>,
    [
      ...TTuple,
      Record<First<TKeys>, TSource[First<TKeys>]>
    ]
  >;


/**
 * **ObjectToTuple**`<TObj,[TCompact]>`
 *
 * Type utility to convert an object to an array of object based key-value pairs.
 *
 * Example:
 * ```ts
 * // readonly [ {key: "foo", value: 1} ]
 * type T = ObjectToTuple<{ foo: 1 }>
 * // readonly [ { foo: 1 } ]
 * type C = ObjectToTuple< foo: 1 }, true>;
 * ```
 */
export type ObjectToTuple<
  TObj extends AnyObject,
  TCompact extends boolean = false
> = TObj extends ExplicitlyEmptyObject
? []
: IsWideContainer<TObj> extends true
? TCompact extends false ? KeyValue[] : Record<ObjectKey,any>[]
: TCompact extends false
  ? Process<TObj, As<Keys<TObj>, readonly (ObjectKey & keyof TObj)[] >>
  : Compact<TObj, As<Keys<TObj>, readonly (ObjectKey & keyof TObj)[] >>
