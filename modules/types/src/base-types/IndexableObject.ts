import type {
    Dictionary,
    EmptyObject,
    ExpandRecursively,
    If,
    IsEqual,
    IsNever,
    RemoveIndex,
    RemoveIndexKeys,
    UnionToTuple
} from "inferred-types/types";

type Len<T extends Dictionary> = UnionToTuple<keyof RemoveIndexKeys<T>>["length"];

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
    TIndex extends Dictionary = Dictionary,
> = If<
    IsNever<TObj>,
    never,
    IsEqual<TObj, EmptyObject> extends true

        ? Dictionary
        : IsNever<Len<TObj>> extends true

            ? Dictionary
            : ExpandRecursively<TIndex & RemoveIndex<TObj>>

>;
