import { IfLength, Narrowable } from "../../types/base";

/**
 * **optional**(value)
 * 
 * A function which takes the value `T` and makes sure it
 * includes a union with _undefined_.
 */
export function optional<
  N extends Narrowable,
  K extends PropertyKey,
  T extends readonly (Record<K,N> | Narrowable)[]
>(...values: T): IfLength<
  T, 1,
  T[0] | undefined,
  T | undefined
> {
  return (
    values.length === 1 
    ? values[0] 
    : values
  ) as IfLength<
      T, 1,
      T[0] | undefined,
      T | undefined
    >;
}
