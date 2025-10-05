import type { As, Dictionary, ExpandDictionary, ObjectKeys } from "inferred-types/types";

type Mix<
    A extends Dictionary,
    B extends Dictionary,
    K extends readonly (PropertyKey & keyof B)[] = As<ObjectKeys<B>, readonly (PropertyKey & keyof B)[]>
> = K extends [
    infer Head extends keyof B & PropertyKey,
    ...infer Rest extends readonly (keyof B & PropertyKey)[]
]
    ? Head extends keyof A
        ? Mix<Omit<A, Head> & Record<Head, A[Head] | B[Head]>, B, Rest>
        : Mix<A & Record<Head, B[Head]>, B, Rest>
    : ExpandDictionary<A>;

/**
 * **MixObjects**`<A,B>`
 *
 * Combines two objects by unionizing the values of shared keys
 * and adding keys in `B` to `A` which didn't exist.
 */
export type MixObjects<
    A extends Dictionary,
    B extends Dictionary
> = Mix<A, B>;
