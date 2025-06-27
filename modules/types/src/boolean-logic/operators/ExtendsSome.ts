import type { AfterFirst, First } from "inferred-types/types";

/**
 * **ExtendsSome**`<TValue,TList>`
 *
 * Boolean type utility which evaluates whether `TValue` extends **some** of the
 * elements in `TList`.
 *
 * **Related:** `ExtendsAll`, `IfExtendsSome`, `DoesExtend`
 */
export type ExtendsSome<
    TValue,
    TExtendsSome extends readonly unknown[],
> = [] extends TExtendsSome
    ? false
    : TValue extends First<TExtendsSome>
        ? true // short circuit with true
        : ExtendsSome<TValue, AfterFirst<TExtendsSome>>;
