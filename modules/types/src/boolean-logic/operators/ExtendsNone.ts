import type { ExtendsSome, Not } from "inferred-types/types";

/**
 * **ExtendsAll**`<TValue, TList>`
 *
 * Boolean type utility which evaluates whether a singular
 * value `TValue` extends **all** of the elements in `TList`.
 *
 * **Related:** `ExtendsSome`, `IfExtendsAll`, `DoesExtend`
 */
export type ExtendsNone<
  TValue,
  TList extends readonly unknown[],
> = Not<ExtendsSome<TValue, TList>>;
