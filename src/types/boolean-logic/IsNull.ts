/**
 * **IsNull**`<T>`
 * 
 * Type utility which returns a boolean flag based on whether the given
 * type is **null**.
 */
export type IsNull<T> = T extends null ? true : false;

/**
 * **IfNull**`<T,IF,ELSE>`
 * 
 * Type utility which converts type `T` to `IF` or `ELSE` based on whether
 * `T` is of type **null**.
 */
export type IfNull<T, IF, ELSE> = IsNull<T> extends true ? IF : ELSE;
