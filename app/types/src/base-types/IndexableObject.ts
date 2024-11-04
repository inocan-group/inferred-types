import {  EmptyObject, ExpandRecursively, IsEqual, If, IsNever, Dictionary, RemoveIndex, RemoveIndexKeys, UnionToTuple } from "@inferred-types/types";

type Len<T extends Dictionary> = UnionToTuple<keyof RemoveIndexKeys<T>>["length"]

/**
 * **IndexableObject**`<[TObj], [TIndex]>`
 *
 * Type utility which receives a `KV` object and and adds an _index signature_
 * so that other properties may be added in the runtime.
 *
 * - by default the index signature is `{ [key: string]: unknown; [key: symbol]: unknown }`
 * but this can be changed by changing `TIndex`
 *
 * ```ts
 * // { [x: string]: unknown; foo: 1; bar: 2 }
 * type FooBarIdx = IndexableObject<{foo: 1; bar: 2}, KV<string>>;
 * ```
 *
 * **Related:** `EmptyObject`, `IndexedObject`
 */
export type IndexableObject<
  TObj extends Dictionary = Dictionary,
  TIndex extends Dictionary = Dictionary
> = If<
  IsNever<TObj>,
  never,
  If<
    IsEqual<TObj,EmptyObject>,
    Dictionary,
    If<
      IsNever<Len<TObj>>,
      Dictionary,
      ExpandRecursively<TIndex & RemoveIndex<TObj>>
    >
  >
>;
