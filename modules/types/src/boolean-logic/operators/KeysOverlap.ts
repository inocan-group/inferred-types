import type {
    AfterFirst,
    And,
    Dictionary,
    EmptyObject,
    First,
    IsObjectLiteral,
    ObjectKey,
    ObjectKeys,
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
> = EmptyObject extends A
    ? boolean
    : EmptyObject extends B
        ? boolean

        : And<[
            IsObjectLiteral<A>,
            IsObjectLiteral<B>,
        ]> extends true

            ? ObjectKeys<A> extends readonly ObjectKey[]
                ? Process<
                    ObjectKeys<A>,
                    B
                >
                : never
            : boolean;
