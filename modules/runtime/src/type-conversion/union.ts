import type { Narrowable } from "inferred-types/types";

/**
 * **union**(options) => (value)
 *
 * A higher order function which creates a union type with a runtime value set.
 *
 * **Related:** `unionize`
 */
export function union<
  TOptions extends readonly Narrowable[],
>(..._options: TOptions) {
  return <TValue extends TOptions[number]>(
    value: TValue,
  ): TValue & TOptions[number] => value as TValue & TOptions[number];
}
