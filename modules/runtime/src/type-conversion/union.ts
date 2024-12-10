import type { Narrowable, TupleToUnion } from "inferred-types/types";

/**
 * **union**(options) => (value)
 *
 * A higher order function which creates a union type with a runtime value set.
 *
 * **Related:** `unionize`
 */
export function union<
  TOptions extends readonly Narrowable[],
// eslint-disable-next-line @typescript-eslint/no-unused-vars
>(...options: TOptions) {
  return <
    TValue extends TupleToUnion<TOptions>,
  >(value: TValue) => value as TupleToUnion<TOptions>;
}
