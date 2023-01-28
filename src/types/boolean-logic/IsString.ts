/**
 * **IsString**
 *
 * Type utility which returns true/false based on whether `T` is a
 * string (wide or narrow).
 */
export type IsString<T> = T extends string ? true : false;
