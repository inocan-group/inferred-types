import type {
    AfterFirst,
    AnyObject,
    As,
    First,
    IsWideContainer,
    Keys,
    ObjectKey,
    Or,
} from "inferred-types/types";

type Overlap<
    TKeys extends readonly ObjectKey[],
    TComparator extends AnyObject,
> = [] extends TKeys
    ? false
    : First<TKeys> extends keyof TComparator
        ? true
        : Overlap<
            AfterFirst<TKeys>,
            TComparator
        >;

/**
 * **KeysOverlap**`<A,B>`
 *
 * Boolean operator which tests whether two objects -- `A` and `B` -- have
 * overlapping keys.
 */
export type KeysOverlap<A extends AnyObject, B extends AnyObject> = Or<[
    IsWideContainer<A>,
    IsWideContainer<B>,
]> extends true
    ? boolean
    : Overlap<
        As<Keys<A>, readonly ObjectKey[]>,
        B
    >;
