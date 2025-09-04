import { Dictionary, Err, ExpandRecursively, FnKeyValue, IsNever, IsUnset, RemoveFnProps, TypedFunction, Unset } from "inferred-types/types";

type Break<
    TMsg extends string,
    TCtx extends Dictionary,
    E extends "error" | "never"
> = E extends "error"
? Err<"invalid-intersection", TMsg, TCtx>
: never;

type Set<V, W> = IsUnset<V> extends true
    ? W
    : V & W;

;

type Intersect<
    T extends readonly unknown[],
    E extends "error" | "never",
    F extends TypedFunction | undefined = undefined,
    V = Unset
> = T extends [infer Head, ...infer Rest]
    ? Head extends TypedFunction
        ? IsNever<Set<V, FnKeyValue<Head>>> extends true
            ? Break<
                `A function with a key-value dictionary caused the intersection type to become 'never'`,
                { intersection: V,  conflict: Head},
                E
            >
            : Intersect<
                Rest,
                E,
                Head,
                Set<V, FnKeyValue<Head>>
            >
    : IsNever<Set<V,Head>> extends true
        ? Break<
            `TupleToIntersection<T> hit an element which caused the intersection type to become 'never'`,
            { intersection: V, conflict: Head },
            E
        >
        : Intersect<
        Rest,
        E,
        F,
        Set<V,Head>
    >


: F extends undefined
    ? ExpandRecursively<V>
: F extends TypedFunction
    ? F & ExpandRecursively<V>
: never;


/**
 * **TupleToIntersection**`<T, [E]>`
 *
 * Recursively intersects all the elements of a tuple.
 *
 * - Empty tuples will return `unknown` as type
 * - if you want an Error instead of the `never` type you can set `E` to
 * "error" and the conflicting element which _caused_ the intersection to
 * become `never` will be highlighted.
 */
export type TupleToIntersection<
    T extends readonly unknown[],
    E extends "error" | "never" = "never"
> = [] extends T
? unknown
: Intersect<T, E>;


