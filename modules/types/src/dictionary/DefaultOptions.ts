import { Dictionary } from "types/base-types";

/**
 * **DefaultOptions**`<TFor, TDef>`
 *
 * By providing a shape for an options hash in `TFor`, you can then define
 * the `Required<TFor>` variant with type appropriate default values.
 *
 * The return type is **explicitly** of `Required<TFor>` in intersection with
 * the literal values provided.
 */
export type DefaultOptions<
    TFor extends Dictionary,
    TDef extends Required<TFor>
> = TDef & Required<TFor>;
