import { IsSymbol } from "src/types/boolean-logic";

/**
 * **IfSymbol**`<T,IF,ELSE>`
 * 
 * Type utility which converts type `T` to `IF` or `ELSE` based on whether
 * `T` is of type **Symbol**.
 */
export type IfSymbol<T, IF, ELSE> = IsSymbol<T> extends true ? IF : ELSE;
