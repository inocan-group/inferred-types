import type {
    Container,
    FnKeyValue,
    Get,
    RemoveNever,
    TypedFunction,
} from "inferred-types/types";

type Process<
    TList extends readonly unknown[],
    TKey extends string,
    TDefault = undefined
> = RemoveNever<{
    [K in keyof TList]: TList[K] extends Container | TypedFunction | Error
        ? Get<TList[K], TKey, TDefault>
        : TList[K] extends TypedFunction
            ? Get<FnKeyValue<TList[K]>, TKey, TDefault>
            : TKey extends "."
                ? TList[K]
                : never
}>;

/**
 * **GetEach**`<TList, TKey, [TDefault]>`
 *
 * Type utility which receives a list of types -- `TList` -- and then _gets_ a
 * key `TKey` (using dot syntax) from each element in the array.
 *
 * - if a given element is not an object then it is excluded from the result set
 * - values which evaluate to _undefined_ are also removed from the result set
 * - if either `null` or "" are used for `TKey` then this simply proxies `TList`
 * through
 *
 * ```ts
 * // ["Bob", "Wendy"]
 * type T = GetEach<[
 *    { name: "Bob", age: 12 },
 *    { name: "Wendy", age: 24 }
 * ], "name">
 * ```
 */
export type GetEach<
    TList extends readonly unknown[],
    TKey extends string | null,
    TDefault = undefined
> = TKey extends null
    ? TList
    : TKey extends ""
        ? TList
        : Process<[...TList], Exclude<TKey, null>, TDefault> extends readonly unknown[]
            ? Process<[...TList], Exclude<TKey, null>, TDefault>
            : never;
