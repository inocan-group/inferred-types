import { SameKeys } from "./type-conversion/SameKeys";

/**
 * **Transformer**
 *
 * A function responsible for transforming the _values_ of
 * dictionary `I` into different _values_ for dictionary `O`.
 *
 * This type utility assumes that _keys_ of both dictionaries
 * are the same.
 */
export type Transformer<I extends object, O extends SameKeys<I>, K extends keyof I = keyof I> = (
  input: I,
  key: K
) => O[K];
