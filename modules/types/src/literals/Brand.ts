import type { As, Container, IndexOf, IsEqual, Not, Scalar } from "inferred-types/types";

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
 * type Branded = Brand<string, "UserId">;
 * type Unbranded = Unbrand<Branded>; // string
 * ```
 */
export type Unbrand<T> = T extends Brand<infer B, any>
    ? IsBranded<B> extends true ? Unbrand<B> : B
    : T;

export type IsBranded<T> = Not<IsEqual<T, Unbrand<T>>>;

export type GetBrand<T> = IsBranded<T> extends true
    ? IndexOf<As<T, Container>, typeof BrandSymbol>
    : undefined;
