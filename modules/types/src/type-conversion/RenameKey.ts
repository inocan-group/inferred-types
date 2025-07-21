import type { AnyObject, MapKeys } from "inferred-types/types";

/**
 * **RenameKey**`<T, TFrom, TTo>`
 *
 * Renames a key in `T`.
 */
export type RenameKey<
    T extends AnyObject,
    TFrom extends string,
    TTo extends string,
> = MapKeys<T, [{ from: TFrom; to: TTo }]>;
