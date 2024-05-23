import { TypeToken, TypeTokenKind } from "src/types/index";

/**
 * Adds any `TypeToken` by receiving the `TypeTokenKind` and then whatever 
 * parameters that type requires.
 */
export const addToken = <
  T extends TypeTokenKind,
  TData extends readonly string[]
>(token: T, ...params: TData) => 
  `<<${token}${params.length> 0 ? `::${params.join("::")}` : ""}>>` as TypeToken;

