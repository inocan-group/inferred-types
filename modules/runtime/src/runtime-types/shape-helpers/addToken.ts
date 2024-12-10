import type { TypeToken, TypeTokenKind } from "inferred-types/types";

/**
 * Adds any `TypeToken` by receiving the `TypeTokenKind` and then whatever
 * parameters that type requires.
 */
export function addToken<
  T extends TypeTokenKind,
  TData extends readonly string[],
>(token: T, ...params: TData) {
  return `<<${token}${params.length > 0 ? `::${params.join("::")}` : ""}>>` as TypeToken;
}
