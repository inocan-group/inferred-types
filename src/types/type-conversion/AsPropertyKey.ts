
/**
 * **AsPropertyKey**`<T>`
 * 
 * Ensures that `T` is 
 */
export type AsPropertyKey<T> = T extends string | number | symbol 
? T & PropertyKey
: never;
