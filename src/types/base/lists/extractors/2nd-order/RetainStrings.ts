import { RetainFromList } from "../../..";

/**
 * **RetainStrings**`<T>`
 * 
 * Retains the _string_ values from arrays and discards the rest.
 */
export type RetainStrings<
  T extends unknown[] | readonly unknown[]
> = RetainFromList<T, "extends", string>;
