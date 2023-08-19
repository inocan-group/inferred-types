import { IsObjectLiteral } from "src/types";

/**
 * **IfObjectLiteral**`<T,IF,ELSE>`
 * 
 * Branching utility which returns `IF` when `T` is an object literal;
 * otherwise returns `ELSE`.
 */
export type IfObjectLiteral<T, IF, ELSE> = IsObjectLiteral<T> extends true
? IF
: ELSE;
