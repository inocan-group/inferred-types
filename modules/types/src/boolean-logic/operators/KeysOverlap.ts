import type {
    Dictionary,
    IsWideContainer,
    Or,
    Some,
    StringKeys,
} from "inferred-types/types";

/**
 * **KeysOverlap**`<A,B>`
 *
 * Boolean operator which tests whether two objects -- `A` and `B` -- have
 * overlapping keys.
 */
export type KeysOverlap<A extends Dictionary, B extends Dictionary> = Or<[
    IsWideContainer<A>,
    IsWideContainer<B>,
]> extends true
    ? boolean
    : Some<
        StringKeys<A>,
        "extends",
        StringKeys<B>
    >;
