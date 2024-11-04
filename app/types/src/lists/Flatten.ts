/* eslint-disable no-use-before-define */
import {
  AfterFirst,
  First,
  IsUnion,
  UnionToTuple,
  TupleToUnion,
  IsTuple,
  Or,
  Decrement,
  HasUnionType,
  HasArray,
  IsArray,
  As,
  UnionHasArray
} from "src/types/index";

type ToFlat<T> = IsArray<T> extends true
? As<T, readonly unknown[]>
: IsUnion<T> extends true
  ? UnionHasArray<T> extends true
    ? [FlattenUnion<T>]
    : [T]
: [T];


type FlatPass<
  TList extends readonly unknown[],
  TResult extends readonly unknown[] = []
> = [] extends TList
? TResult
: FlatPass<
    AfterFirst<TList>,
    [
      ...TResult,
      ...ToFlat<First<TList>>
    ]
  >;


/**
 * Processes Tuple structures.
 *
 * - Each pass will start by validating that `TList` still has
 * either Tuples within it or values which are Tuples
 * - Assuming it does
 */
type FlattenTuple<
  TList extends readonly unknown[],
  TLevel extends 0 | 1 | 2 | 3,
> = TLevel extends 0
? TList // we've processed the agreed number of levels
: Or<[ HasUnionType<TList>, HasArray<TList>  ]> extends true
  ? FlattenTuple<
      FlatPass<TList>,
      Decrement<TLevel>
    >
  : TList;


type Iterate<
  T extends readonly unknown[],
  TDepth extends 1 | 2 | 3
> = TupleToUnion<{
  [K in keyof T]: T[K] extends readonly unknown[]
    ? Flatten<T[K], TDepth>
    : T[K]
}>;

export type FlattenUnion<
  TValue,
> = IsUnion<TValue> extends true
? Iterate<UnionToTuple<TValue>, 1>
: TValue;

type WideFlatten<T> = T extends (infer Type)[]
  ? Type extends unknown[]
    ? Type
    : T
  : never

/**
 * Responsible for branching the flattening operation
 * to either `_Flat`, `WideFlatten` for Tuples or Arrays
 * and `FlattenUnion` for a union type.
 *
 * Just returns `TList` "as is" if it's not a a Tuple or
 * Union type.
 */
type Process<
  TList,
  TLevel extends 1 | 2 | 3 = 1
> = TList extends readonly unknown[]
? IsTuple<TList> extends true
? FlattenTuple<TList, TLevel>
: WideFlatten<TList>
: IsUnion<TList> extends true
? FlattenUnion<TList>
: TList;

/**
 * converts a wide array to a scalar and tuple
 * to a union type
 */
type ToScalar<
  TList,
  TLevel extends 1 | 2 | 3
> = [IsTuple<Process<TList>>] extends [true]
? TupleToUnion<Process<TList,TLevel>>
: Process<TList,TLevel> extends (infer Type)[]
  ? Type
  : never;

type IterateScalar<
  T extends readonly unknown[],
  TLevel extends 1 | 2 | 3
> = TupleToUnion<{
  [K in keyof T]: T[K] extends unknown[]
    ? ToScalar<T[K], TLevel>
    : T[K]
}>;

/**
 * **Flatten**`<TList, [TLevel], [ToScalar]>`
 *
 * - where `TList` is an array, this utility will flatten the array to a depth of
 * `TLevel` (by default one level).
 * - where `TList` is a _union type_ it will flatten any of it's elements
 * - where `TList is neither an array nor has a union type which is, this utility
 * simply proxies the value `TList` through
 * - in most cases you would not _flatten_ below a single dimensional array but
 * if you set `ToScalar` to `true` then it will flatten right out of being an array
 * into a union type
 */
export type Flatten<
  TList,
  TLevel extends 1 | 2 | 3 = 1,
  ToScalar extends boolean = false
> = [ToScalar] extends [false]
? // normal operation when ToScalar is false
  Process<TList,TLevel>
: // prep work when ToScalar is activated
  [IsUnion<Process<TList,TLevel>>] extends [true]
  ? IterateScalar<UnionToTuple<Process<TList,TLevel>>, TLevel>
  :  [IsTuple<Process<TList,TLevel>>] extends [true]
  ? TupleToUnion<Process<TList,TLevel>>
  : Process<TList,TLevel> extends (infer Type)[]
    ? Type
    : never
