import {SHAPE_PREFIXES} from "src/constants/index";
import { Mutable } from "../type-conversion/Mutable";
import { TupleToUnion } from "../type-conversion/TupleToUnion";
import { IfNever, IfTrue, IfUndefined } from "../boolean-logic";
import { IndexableObject } from "../base-types/IndexableObject";
import { ObjectKey } from "../base-types/ObjectKey";
import { Narrowable } from "./Narrowable";

type Narrow = Exclude<Narrowable, symbol>;

type Prefixes = TupleToUnion<Mutable<typeof SHAPE_PREFIXES>>;
/**
 * **Shape**
 * 
 * This is a union type that captures all signatures of **shapes** which 
 * are produced as the runtime representation of a type by utilities
 * like the `ShapeApi` and the `shape()` runtime function.
 */
export type Shape = `<<${Prefixes}${string}>>`

/**
 * **ShapeAddOrDone**`<TTuple, TMakeUnion>`
 * 
 * The structure of endpoints on the `ShapeApi` which return
 * a tuple or union.
 */
export type ShapeTupleOrUnion<
  TTuple extends readonly Narrow[] = Narrow[],
  TMakeUnion extends boolean = boolean,
> = {
  add: <
    TAdd extends Narrow
  >(a: TAdd) => ShapeTupleOrUnion<[...TTuple, TAdd], TMakeUnion>;
  done: () => IfTrue<
    TMakeUnion, 
    TupleToUnion<TTuple>, 
    TTuple
  >;
}

export type WideTypeName = "string" | "number" | "boolean" | "null" | "undefined" | "unknown" | "object";

export type ShapeApi__Wide<
  TUnion = never,
  TExclude extends string = ""
> = Omit<{
  string: () => IfNever<TUnion, string, string | TUnion>;
  number: () => IfNever<TUnion,number, number | TUnion>;
  boolean: () => IfNever<TUnion,boolean,TUnion | boolean>;
  null: () => IfNever<TUnion, null, null | TUnion>;
  undefined: () => IfNever<TUnion, undefined, undefined | TUnion>;
  unknown: () => IfNever<TUnion, unknown, unknown | TUnion>;
}, TExclude>

// export type RecordUnion = [
//   Choice<["string", string]>,
//   Choice<["number", number]>,
//   Choice<["boolean", boolean]>,
//   Choice<["undefined", undefined]>,
//   Choice<["null", null]>,

// ]

/**
 * The `ShapeApi` is an API surface for defining types which have a runtime aspect
 * to them as well. 
 * 
 * This is precisely what the `shape()` runtime utility exposes
 * but any function can add this -- typically by associating a property on a function
 * -- with the `ShapeCallback` type which simply gives this API to the caller of
 * the function.
 */
export type ShapeApi = ShapeApi__Wide & {
  /**
   * **Object**
   * 
   * Add either a plain `object` type or pass in `true` to the function to make it
   * an `IndexableObject`.
   */
  object: <I extends boolean>(indexable?: I) => IfTrue<I, IndexableObject, object>;

  /**
   * **Record**
   * 
   * Create `Record<K,V>` types.
   */
  record:  {
    string: () => Record<ObjectKey, string>;
    number: () => Record<ObjectKey, number>;
    boolean: () => Record<ObjectKey, boolean>;
    unknown: () => Record<ObjectKey, unknown>;
    union: <
      U extends readonly WideTypeName[]
    >(...members: U) => IfUndefined<U,NonNullable<unknown>, Record<ObjectKey, TupleToUnion<U>>>;
  };
  array:  {
    string: () => string[];
    number: () => number[];
    boolean: () => boolean[];
    unknown: () => unknown[];
  };
  /**
   * Add one or more literal values which will be combined into a _union type_.
   */
  literals: <T extends readonly Narrow[]>(...literal: T) => ShapeTupleOrUnion<T, true>;
  /**
   * **tuple**
   * 
   * Add one or more literal values to create a **tuple** type
   */
  tuple: <T extends Narrow>(literal: T) => ShapeTupleOrUnion<[T], false>;
  /**
   * **Optional**
   * 
   * Assign a type that is in union with _undefined_ (aka, making it optional)
   */
  opt: ShapeApi__Wide<undefined, "undefined">;
}

/**
 * **ShapeCallback**
 * 
 * This is a function signature for a property which you want to use
 * the `SharpApi` with to define types.
 */
export type ShapeCallback = (api: ShapeApi) => unknown;
