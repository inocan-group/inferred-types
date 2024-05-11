import { Constant } from "../../constants/Constant";
import { If } from "../boolean-logic/branching/If";
import { IsLiteral } from "../boolean-logic/operators/IsLiteral";
import { RemoveMarked } from "../containers";


type Process<
T extends readonly unknown[]
> = RemoveMarked<{
[K in keyof T]: If<
  IsLiteral<T[K]>,
  Constant<"Marked">,
  T[K]
>
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
