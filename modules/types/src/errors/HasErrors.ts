import { Container, Dictionary, Err, Values } from "inferred-types/types";

type CheckArray<T extends readonly unknown[], U extends string | undefined> = T extends [infer Head, ...infer Rest]
? U extends string
    ? Head extends Err<U>

    ? true
    : CheckArray<Rest, U>
: Head extends Error
    ? true
    : CheckArray<Rest, U>
: false;

type CheckDictionary<T extends Dictionary, U extends string | undefined> = CheckArray<
    Values<T>,
    U
>;

/**
 * **HasErrors**`<T, [U]>`
 *
 * Checks whether a container `T` has _values_ which extend Error.
 */
export type HasErrors<
    T extends Container,
    U extends string | undefined = undefined
> = T extends readonly unknown[]
? CheckArray<T, U>
: T extends Dictionary
? CheckDictionary<T, U>
: never;
