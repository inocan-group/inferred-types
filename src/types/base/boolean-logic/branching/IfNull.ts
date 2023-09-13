import { IsNull } from "../..";

/**
 * **IfNull**`<T,IF,ELSE>`
 * 
 * Type utility which converts type `T` to `IF` or `ELSE` based on whether
 * `T` is of type **null**.
 */
export type IfNull<T, IF, ELSE> = IsNull<T> extends true ? IF : ELSE;
