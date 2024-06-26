/* eslint-disable no-use-before-define */
import { 
  Contains , 
  AfterFirst, 
  First, 
  IsUnion, 
  UnionToTuple, 
  TupleToUnion, 
  IsTuple, 
  Or
} from "src/types/index";

type TupleHasUnionWithTuple<
  T extends readonly unknown[]
> = Or<{
  [K in keyof T]: [IsUnion<T[K]>] extends [true]
    ? Contains<UnionToTuple<T[K]>, unknown[]>
    : false;
}>;

type _Flat<
  TList extends readonly unknown[],
  TLevel extends 1 | 2 | 3,
  TResults extends readonly unknown[] = []
> = [] extends TList
  ? TLevel extends 1
    ? TResults
    : Or<[
        Contains<TResults, unknown[]>,
        TupleHasUnionWithTuple<TResults>,
      ]> extends true
      ? TLevel extends 3
        ? _Flat<TResults, 2>
        : _Flat<TResults, 1>
      : TupleHasUnionWithTuple<TResults> extends true
          ? TResults
          : TResults
  : _Flat<
      AfterFirst<TList>, 
      TLevel,
      First<TList> extends unknown[] | readonly unknown[]
        ? [ ...TResults, ...First<TList>]
        : IsUnion<First<TList>> extends true
          ? [ 
              ...TResults, 
              ...(
                ReduceUnion<First<TList>> extends unknown[]
                  ? ReduceUnion<First<TList>>
                  : [ReduceUnion<First<TList>>]
              )
            ]
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
> = IsUnion<TValue> extends true
? Iterate<UnionToTuple<TValue>, 1>
: TValue;

type ReduceUnion<
  TValue,
> = IsUnion<TValue> extends true
? IterateScalar<UnionToTuple<TValue>, 1>
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
? FlattenUnion<TList>
: TList;

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
