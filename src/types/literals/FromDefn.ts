import { Constant } from "../../constants/Constant";
import { EmptyObject } from "../base-types";
import { Dictionary } from "../base-types/Dictionary";
import { ObjectKey } from "../base-types/ObjectKey";
import { Tuple } from "../base-types/Tuple";
import { IsEqual } from "../boolean-logic";
import { Contains } from "../boolean-logic/operators/Contains";
import { IsNever } from "../boolean-logic/operators/IsNever";
import { Keys } from "../dictionary/Keys";
import { Values } from "../dictionary/Values";
import { HandleDoneFn } from "../functions/HandleDoneFn";
import { AfterFirst, First } from "../lists";
import { AsDictionary } from "../type-conversion";
import { TupleToUnion } from "../type-conversion/TupleToUnion";
import { ExpandDictionary } from "./ExpandRecursively";
import { NarrowableScalar } from "./NarrowableScalar";
import { ShapeCallback,  UnionElDefn } from "./Shape";



type HandleObject<
  TObj extends Dictionary,
  TKeys extends readonly unknown[],
  TResult extends Dictionary = EmptyObject
> = [] extends TKeys
? ExpandDictionary<TResult>
: HandleObject<
    TObj,
    AfterFirst<TKeys>,
    First<TKeys> extends keyof TObj
      ? TObj[First<TKeys>] extends ShapeCallback
        ? Record<
            First<TKeys>,
            HandleDoneFn<ReturnType< TObj[First<TKeys>] >>
          > & TResult
        : Record<
            First<TKeys>,
            TObj[First<TKeys>]
          > & TResult
      : never
  >;


type ProcessUnion<
  T extends UnionElDefn
> = T extends Tuple 
    ? TupleToUnion<T>
    : T extends ShapeCallback
      ? HandleDoneFn<ReturnType<T>>
        : never;
type IterateUnion<T extends readonly UnionElDefn[]> = {
  [K in keyof T]: ProcessUnion<T[K]>
}

/**
 * **AsUnion**
 * 
 * Receives a `UnionTokenSet`, a `ShapeCallback` or just a tuple of values
 * and makes this into _union type_.
 */
export type AsUnion<T extends UnionElDefn | readonly [UnionElDefn, ...UnionElDefn[]]> = T extends UnionElDefn[]
? TupleToUnion<IterateUnion<T>>
: T extends UnionElDefn
? ProcessUnion<T>
: never;

export type IsDictionaryDefinition<T> = T extends Dictionary
? Contains<Values<T>, ShapeCallback>
: false;

/**
 * converts non-tuple definition types to actual type
 */
type ToType<
  T,
  TElse
> = 
[T] extends [ShapeCallback]
  ? HandleDoneFn<ReturnType<T>>
: [IsDictionaryDefinition<T>] extends [true]
  ? HandleObject<AsDictionary<T>, Keys<AsDictionary<T>>>
: IsEqual<TElse, Constant<"not-set">> extends true
  ? T
  : TElse;

/**
 * iterates over tuple definition types to convert into real types
 */
type IterateOverDefinitions<
  T extends readonly unknown[],
  TElse
> = {
  [K in keyof T]: ToType<T[K], TElse>;
}

export type TypeDefinition = NarrowableScalar | ShapeCallback;


/**
 * **DictShapeDefn**`<T>`
 * 
 * A _dictionary_ shape which provides direct value input or use of
 * the `ShapeCallback` API to any of the dictionaries values.
 * 
 * Use of the generic `T` is not required but adding it as a separate
 * generic will increase the narrowness of your types.
 */
export type DictTypeDefinition<
  V extends TypeDefinition = TypeDefinition
> = Record<
  ObjectKey, 
  V
>;


/**
 * **FromDefn**`<T, [TElse]>`
 * 
 * Takes either a singular `T` or a tuple of values for `T` and
 * looks for any cases where a `ShapeCallback` is found:
 * 
 * - where it is found, it will resolve the type
 * - where it is not it will simply proxy the values through
 * - if `TElse` is set you can redirect values which don't use
 * the ShapeCallback API to a specific type.
 * 
 * Note: when dictionary objects are found the _values_ will be 
 * interrogated for ShapeCallback's.
 */
export type FromDefn<
  T,
  TElse = Constant<"not-set">
> = T extends readonly unknown[]
? IterateOverDefinitions<T,TElse>
: ToType<T,TElse>;



