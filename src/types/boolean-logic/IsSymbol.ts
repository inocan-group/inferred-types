/**
 * **IsSymbol**`<T>`
 * 
 * Type utility which returns a boolean flag based on whether the given
 * type is a **Symbol**.
 */
export type IsSymbol<T> = T extends Symbol ? true : false;

/**
 * **IfSymbol**`<T,IF,ELSE>`
 * 
 * Type utility which converts type `T` to `IF` or `ELSE` based on whether
 * `T` is of type **Symbol**.
 */
export type IfSymbol<T, IF, ELSE> = IsSymbol<T> extends true ? IF : ELSE;
