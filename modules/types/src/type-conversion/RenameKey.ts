import type { AnyObject } from "src/base-types";
import type { ReplaceKeys } from "./ReplaceKeys";

/**
 * **RenameKey**`<T, TFrom, TTo>`
 *
 * Renames a key in `T`.
 */
export type RenameKey<
  T extends AnyObject,
  TFrom extends string,
  TTo extends string,
> = ReplaceKeys<T, [{ from: TFrom; to: TTo }]>;
