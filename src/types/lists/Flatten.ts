/* eslint-disable no-use-before-define */
import { Contains , AfterFirst, First, IsUnion, UnionToTuple, TupleToUnion, IsTuple } from "src/types/index";

type _Flat<
  TList extends readonly unknown[],
  TLevel extends 1 | 2 | 3,
  TResults extends readonly unknown[] = []
> = [] extends TList
  ? TLevel extends 1
    ? TResults
    : Contains<TResults, unknown[]> extends true
      ? TLevel extends 3
        ? _Flat<TResults, 2>
        : _Flat<TResults, 1>
      : TResults
  : _Flat<
      AfterFirst<TList>, 
      TLevel,
      First<TList> extends unknown[] | readonly unknown[]
        ? [ ...TResults, ...First<TList>]
        : [ ...TResults, First<TList> ]
    >;


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
  TDepth extends 1 | 2 | 3 = 1
> = IsUnion<TValue> extends true
? Iterate<UnionToTuple<TValue>, TDepth>
: TValue;

type WideFlatten<T> = T extends (infer Type)[] 
  ? Type extends unknown[]
    ? Type
    : T
  : never

type Process<
TList,
TLevel extends 1 | 2 | 3 = 1
> = TList extends readonly unknown[]
? IsTuple<TList> extends true
? _Flat<TList, TLevel>
: WideFlatten<TList>
: IsUnion<TList> extends true
? FlattenUnion<TList,TLevel>
: TList;

type ToScalar<
  TList,
  TLevel extends 1 | 2 | 3
> = [IsTuple<Process<TList,TLevel>>] extends [true]
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
 */
export type Flatten<
  TList,
  TLevel extends 1 | 2 | 3 = 1,
  ToScalar extends boolean = false
> = [ToScalar] extends [false]
? Process<TList,TLevel>
: [IsUnion<Process<TList,TLevel>>] extends [true]
  ? IterateScalar<UnionToTuple<Process<TList,TLevel>>, TLevel>
  :  [IsTuple<Process<TList,TLevel>>] extends [true]
  ? TupleToUnion<Process<TList,TLevel>>
  : Process<TList,TLevel> extends (infer Type)[]
    ? Type
    : never
