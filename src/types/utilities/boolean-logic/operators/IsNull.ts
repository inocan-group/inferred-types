/**
 * **IsNull**`<T>`
 * 
 * Type utility which returns a boolean flag based on whether the given
 * type is **null**.
 */
export type IsNull<T> = T extends null ? true : false;

