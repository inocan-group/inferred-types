import type { Scalar } from "types/base-types";
import type { BrandSymbol } from "./BrandSymbol";

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
> = [Kv] extends [undefined]
    ? Base & { [BrandSymbol]: Kind }
    : Base & { [BrandSymbol]: Kind } & Kv;
