import { RetainFromList } from "../RetainFromList";

/**
 * **RetainStrings**`<T>`
 * 
 * Retains the _string_ values from arrays and discards the rest.
 */
export type RetainStrings<
  T extends any[] | readonly any[]
> = RetainFromList<T, "extends", string>;
