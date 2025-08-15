import type {
    AfterFirst,
    Dictionary,
    EmptyObject,
    Equals,
    First,
    IsUnion,
    Keys,
    RemoveNever,
    Some,
    UnionToTuple,
} from "inferred-types/types";

type RemoveEmptyObject<
    T extends readonly unknown[],
    R extends readonly unknown[] = [],
> = [] extends T
    ? RemoveNever<R>[number]
    : RemoveEmptyObject<
        AfterFirst<T>,
        [
            ...R,
            First<T> extends Dictionary
                ? Equals<Keys<First<T>>["length"], number> extends true
                    ? never
                    : First<T>
                : First<T>,
        ]
    >;

/**
 * **UnionFilter**`<U, E>`
 *
 * A type utility which receives a union type `U` and then eliminates
 * all elements of the union which _extend_ `E`.
 *
 * **Note:** _this is very much like `Exclude<U,E>` utility but can handle
 * unions of containers as well as just scalar values._
 *
 * **Related:** `UnionRetain`
 */
export type UnionFilter<
    U,
    E,
> = [U] extends [never]
    ? never
    : IsUnion<U> extends true
        ? Some<UnionToTuple<E>, "extends", EmptyObject> extends true
            ? Exclude<
                RemoveEmptyObject<UnionToTuple<U>>,
                RemoveEmptyObject<UnionToTuple<E>>
            >
            : Exclude<U, E>
        : U; // not union
