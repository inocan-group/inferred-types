import type { Expand } from "inferred-types/types";

type NeverOnSet<T> = T extends `set${infer Name}`
    ? Name extends Capitalize<Name>
        ? never
        : T
    : T;

/**
 * **Immutable**`<T>`
 *
 * An alternative to `Readonly<T>` but adds:
 *
 * - removes the types of all _setter_ methods in the values of `T`
 * - deeply sets container properties as read-only (rather than just top level properties)
 *
 * **Related:** `immutable()`, `freeze()`, `var Object.freeze()`
 */
export type Immutable<
    T extends object,
    TDeep extends boolean = true
> = Expand<{
    readonly [K in keyof T as T[K] extends Function ? NeverOnSet<K> : K]: T[K] extends object
        ? TDeep extends false ? T[K] : Immutable<T[K], TDeep>
        : T[K]
}>;
