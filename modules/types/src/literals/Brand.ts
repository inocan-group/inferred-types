import type { Scalar } from "inferred-types/types";

export declare const BrandSymbol: unique symbol;

export type Brand<
    Base extends Scalar,
    Kind
> = Base & { [BrandSymbol]: Kind };

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

/**
 * **IsBranded**`<T>`
 *
 * Boolean operator which tests whether `T` has been _branded_ with the
 * `Brand<T>` utility.
 */
export type IsBranded<T> = typeof BrandSymbol extends keyof T ? true : false;

/**
 * **GetBrand**`<T>`
 *
 * Get's the "brand" that the symbol has been
 */
export type GetBrand<T> = typeof BrandSymbol extends keyof T
    ? T[typeof BrandSymbol]
    // IndexOf<As<T, Container>, typeof BrandSymbol>
    : undefined;
