import type { Brand, IsBranded } from "inferred-types/types";

/**
 * **Unbrand**`<T>`
 *
 * Removes branding from a branded type, returning the original base type.
 *
 * Note: This utility has a known limitation with intersection types.
 * When a branded type is intersected with a literal (e.g., `Brand<string, "Kind"> & "literal"`),
 * TypeScript creates a composite type that cannot be decomposed to extract just the literal.
 * This is a fundamental TypeScript limitation.
 *
 * @example
 * ```ts
 * // string & { [Brand Symbol]: "UserId" }
 * type Branded = Brand<string, "UserId">;
 * type Unbranded = Unbrand<Branded>; // string
 * ```
 */
export type Unbrand<T> = T extends Brand<infer B, any>
    ? IsBranded<B> extends true ? Unbrand<B> : B
    : T;
