/**
 * **MultiArrayType**`<T>`
 *
 * Extracts the _type_ inside of a multi-dimensional array.
 */
export type MultiArrayType<T> = T extends any[]
    ? T extends Array<infer Type>
        ? MultiArrayType<Type>
        : T
    : never;
