import type {
    Dictionary,
    HasIndexKeys,
    IsTemplateLiteral,
    ObjectKeys,
    WithKeys
} from "inferred-types/types";

// For arrays, preserve the structure but remove index signatures
// Note: Array handling is complex due to TypeScript's array type structure
type Arr<T> = {
    [K in keyof T as number extends K
        ? never
        : string extends K
            ? never
            : symbol extends K
                ? never
                : K]: T[K]
};

// For dictionaries, filter out wide keys and template literal keys
type FilterDictKeys<T> = {
    [K in keyof T as
    // Remove wide string index
    string extends K ? never
        // Remove wide number index
        : number extends K ? never
        // Remove wide symbol index
            : symbol extends K ? never
            // Remove template literal index patterns (this doesn't work!)
                : IsTemplateLiteral<K> extends true ? never
                // Keep the key
                    : K
    ]: T[K]
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
    ? HasIndexKeys<T> extends true
        ? Required<ObjectKeys<FilterDictKeys<T>>> extends infer Keys extends readonly PropertyKey[]
            ? WithKeys<T, Keys>
            : never
        : T
    : T extends readonly any[]
        ? Arr<T>
        : never;
