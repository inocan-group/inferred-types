

/**
 * **Suggest**`<T>`
 *
 * Type utility that helps to build a enumerated set
 * of string literals which _could_ be the value for
 * a string based property but _allows_ a string that
 * is not part of the suggestion to be typed in too.
 *
 * - `T` can be a _union_ of string literals or an
 * _array_ of string literals.
 * - If T is a wide string then we must return
 * just a wide string as no suggestions are possible
 */
export type Suggest<
    T extends readonly string[] | string,
> = T extends readonly string[]
    ? T[number] | (string & {})
    : T extends string
        ? T | (string & {})
        : never;






