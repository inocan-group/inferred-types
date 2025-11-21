import type { BrandSymbol, IsUndefined, Scalar } from "inferred-types/types";

/**
 * **Brand<Base,Kind,[Kv]>**
 *
 * Brands a scalar `Base` type with `{ [BrandSymbol]: Kind }`.
 *
 * - you may optionally choose to add other key/value pairs
 *   to the metadata.
 */
export type Brand<
    Base extends Scalar,
    Kind,
    Kv extends Record<string, unknown> | undefined = undefined
> = IsUndefined<Kv> extends true
    ? Base & { [BrandSymbol]: Kind }
    : Base & { [BrandSymbol]: Kind } & Kv;
