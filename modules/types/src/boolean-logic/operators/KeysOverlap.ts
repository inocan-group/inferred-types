import type {
    AfterFirst,
    Dictionary,
    ExplicitlyEmptyObject,
    First,
    IsWideContainer,
    ObjectKey,
    ObjectKeys,
    Or,
} from "inferred-types/types";

type Process<
    K extends readonly ObjectKey[],
    O extends Dictionary
> = [] extends K
? false
: First<K> extends keyof O
    ? true
    : Process<AfterFirst<K>, O>;


/**
 * **KeysOverlap**`<A,B>`
 *
 * Boolean operator which tests whether two objects -- `A` and `B` -- have
 * overlapping keys.
 */
export type KeysOverlap<
    A extends Dictionary,
    B extends Dictionary
> = Or<[
    IsWideContainer<A>,
    IsWideContainer<B>,
]> extends true
    ? boolean
    : Process<
        ObjectKeys<A>,
        B
    >;


