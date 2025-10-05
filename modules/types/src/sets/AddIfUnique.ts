import { As, Contains, GetEach, IsNull, Dictionary, ObjectKeys, EmptyObject, ExpandDictionary } from "inferred-types/types";


type Merge<
    A extends Dictionary,
    B extends Dictionary,
    K extends readonly (PropertyKey & keyof B)[] = As<ObjectKeys<B>, readonly (PropertyKey & keyof B)[]>
> = K extends [
    infer Head extends PropertyKey & keyof B,
    ...infer Rest extends readonly (PropertyKey & keyof B)[]
]
    ? Head extends keyof A
        ? Merge<Omit<A,Head> & Record<Head, A[Head] | B[Head]>,B,Rest>
        : Merge<A & Record<Head, B[Head]>, B, Rest>
: ExpandDictionary<A>;

/**
 * **AddIfUnique**`<TItem, TList, [TOffset]>`
 *
 * Adds `TItem` to the end of `TList` if it's type does not
 * already exist in `TList`.
 *
 * - if `TOffset` is used -- _by default it is not_ -- then the
 * uniqueness comparison will be done on a property offset of
 * both the `TItem` and the `TList` items.
 *     - when the offset type of `TItem` is found in `TList` then
 *     no new items will be added to `TList` but the matched item
 *     in `TList` will be updated to be a union with `TItem`
 */
export type AddIfUnique<
    TItem,
    TList extends readonly unknown[],
    TOffset extends string | null = null
> = IsNull<TOffset> extends true
    ? Contains<TList, TItem> extends true
        ? TList
        : [...TList, TItem]
    : TOffset extends keyof TItem
        ? Contains<GetEach<TList, TOffset>, TItem[TOffset]> extends true
            ? {
                [K in keyof TList]: TOffset extends keyof TList[K]
                    ? TList[K][TOffset] extends TItem[TOffset]
                        ? Merge<As<TList[K], Dictionary>, As<TItem, Dictionary>>
                        : TList[K]
                    : TList[K]
            }
            : [...TList, TItem]
    : TList;
