import type { Container, Dictionary, RequiredKeys } from "inferred-types/types";

/**
 * Helper type that checks if Required<T> structurally differs from T
 * by using the readonly modifier trick to avoid deep instantiation.
 */
type RequiredDiffersFromOriginal<T extends readonly unknown[]>
    = [Required<T>] extends [T]
        ? [T] extends [Required<T>]
            ? false
            : true
        : true;

export type HasOptionalElements__Tuple<T extends readonly unknown[]> = RequiredDiffersFromOriginal<T>;

/**
 * **HasOptionalElements**`<T>`
 *
 * Boolean operator which detects whether the container `T` has any
 * elements/keys which are considered "optional".
 */
export type HasOptionalElements<T extends Container> = [T] extends [readonly unknown[]]
    ? RequiredDiffersFromOriginal<T>
    : T extends Dictionary
        ? [keyof T] extends [RequiredKeys<T>]
            ? [RequiredKeys<T>] extends [keyof T]
                ? false
                : true
            : true
        : never;
