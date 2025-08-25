import type { Dictionary, DictionaryWithFixedKeys } from "inferred-types/types";

// For arrays, preserve the structure but remove index signatures
type Arr<T> = {
    [K in keyof T as number extends K
        ? never
        : string extends K
            ? never
            : symbol extends K
                ? never
                : K]: T[K]
};

/**
 * **RemoveIndexKeys**`<T>`
 *
 * Removes _index_ keys which permit key/values to be added to an object while
 * retaining all explicit key/values defined on an object.
 *
 * - this includes both _wide_ indexes like `string` but also literal template
 * indexes like `_${string}`
 *
 * ```ts
 * type Obj = { [key: string]: unknown; foo: 42 };
 * // { foo: 42 }
 * type Obj2 = RemoveIndexKeys<Obj>;
 * ```
 */
export type RemoveIndexKeys<T> = T extends Dictionary
    ? DictionaryWithFixedKeys<T>
    : T extends readonly any[]
        ? Arr<T>
        : never;
