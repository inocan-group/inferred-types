import { IfWide, RemoveNever } from "src/types/index";

/**
 * **RemoveWide**`<T>`
 * 
 * Extracts wide/non-literal values from a tuple; retains the rest.
 */
export type RemoveWide<
  T extends readonly unknown[]
> = RemoveNever<{
  [K in keyof T]: IfWide<T[K], never, T[K]>
}>
