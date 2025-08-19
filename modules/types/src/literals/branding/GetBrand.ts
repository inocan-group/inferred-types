import type { BrandSymbol } from "inferred-types/types";

/**
 * **GetBrand**`<T>`
 *
 * Get's the "brand" that the symbol has been
 */
export type GetBrand<T> = typeof BrandSymbol extends keyof T
    ? T[typeof BrandSymbol]
    // IndexOf<As<T, Container>, typeof BrandSymbol>
    : undefined;
