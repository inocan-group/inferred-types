import type { Dictionary, IsEqual, ReadonlyKeys } from "inferred-types/types";

/**
 * **IsReadonlyObject**`<T>`
 *
 * Boolean operator which tests whether `T` is a _readonly
 * object_. This is defined as an object where all properties
 * are readonly.
 *
 * - Note: objects with no properties return `false`
 */
export type IsReadonlyObject<T> = T extends Dictionary
    ? IsEqual<ReadonlyKeys<T>, keyof T>
    : false;
