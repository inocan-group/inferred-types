import { Narrowable, TupleToUnion } from "inferred-types/dist/types/index";

/**
 * **union**(options) => (value)
 *
 * A higher order function which creates a union type with a runtime value set.
 *
 * **Related:** `unionize`
 */
export const union = <
  TOptions extends readonly Narrowable[]
// eslint-disable-next-line @typescript-eslint/no-unused-vars
>(...options: TOptions) => <
  TValue extends TupleToUnion<TOptions>
>(value: TValue) => value as TupleToUnion<TOptions>;
