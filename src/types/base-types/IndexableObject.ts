import {  EmptyObject, ExpandRecursively, IfEqual, IfNever, Keys,KV, RemoveIndex } from "src/types/index";

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
  TObj extends KV = KV,
  TIndex extends KV = KV
> = IfNever<
  TObj,
  never,
  IfEqual<
    TObj,EmptyObject,
    KV,
    IfNever<
      Keys<TObj>["length"],
      KV,
      ExpandRecursively<TIndex & RemoveIndex<TObj>>
    >
  >
>;
