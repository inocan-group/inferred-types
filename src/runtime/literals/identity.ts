import { Narrowable } from "src/types/literals";


/**
 * An identity function for any type, with the goal of preserving literal type information
 * where ever possible.
 */
export const identity = <
N extends Narrowable,
K extends PropertyKey,
T extends readonly (Record<K,N> | N)[]
>(...values: T) => (
  values.length === 1
  ? values[0]
  : values.length === 0
    ? undefined
    : values
 ) as T["length"] extends 1
  ? T[0]
  : T["length"] extends 0
    ? undefined
    : T;
