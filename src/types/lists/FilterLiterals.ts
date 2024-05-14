import { Constant } from "src/constants/index";
import { IsLiteral, RemoveMarked } from "src/types/index";


type Process<
T extends readonly unknown[]
> = RemoveMarked<{
  [K in keyof T]: IsLiteral<T[K]> extends true
    ? Constant<"Marked">
    : T[K]
}>


/**
 * **FilterLiterals**`<T>`
 * 
 * Receives a tuple of items and filters out all literal items
 * (e.g., object literals, tuple literals, string literals, 
 * numeric literals, and boolean literals).
 * 
 * Elements like _undefined_ and `null` are kept in the tuple.
 * 
 * **Related:** `Filter`, `FilterWideTypes`, `RetainLiterals`
 */
export type FilterLiterals<
  T extends readonly unknown[]
> = Process<T> extends readonly unknown[]
? Process<T>
: never;
