import { Constant } from "inferred-types/dist/constants/index";
import { IsWideType } from "../boolean-logic";
import { If } from "../boolean-logic/branching/If";
import { RemoveMarked } from "../containers";

/**
 * **FilterWideTypes**`<T>`
 *
 * Receives a tuple of items and filters out all "wide types"
 * (e.g., object, number, string, Record<string, string>, boolean, etc.).
 *
 * All literal types and elements such as _undefined_ and `null` are kept in the tuple.
 *
 * **Related:** `Filter`, `FilterLiterals`, `RetainWideTypes`
 */
export type FilterWideTypes<
  T extends readonly unknown[]
> = RemoveMarked<{
  [K in keyof T]: If<
    IsWideType<T[K]>,
    Constant<"Marked">,
    T[K]
  >
}>
