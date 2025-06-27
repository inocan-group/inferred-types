/**
 * **IsSymbol**`<T>`
 *
 * Type utility which returns a boolean flag based on whether the given
 * type is a **Symbol**.
 */
export type IsSymbol<T> = T extends symbol ? true : false;
