import type { Dictionary, Tuple } from "inferred-types/types";

/**
 * **AsRecord**`<T>`
 *
 * Receives a `Record`, `object`, or `Tuple` and ensures the type
 * is a `Record` type for all object-like types and just passes
 * Tuples through "as is".
 */
export type AsRecord<
    T extends Dictionary | object,
> = T extends Tuple
    ? T
    : T extends Dictionary
        ? T
        : T extends object

            ? T extends any[]
                ? never
                : NonNullable<unknown>
            : never;
