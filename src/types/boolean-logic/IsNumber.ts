/**
 * **IsNumber**`<T>`
 * 
 * Boolean type utility testing whether `T` is a numeric type.
 */
export type IsNumber<T> = T extends number ? true : false;
