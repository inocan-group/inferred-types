import type { TypeToken, TypeTokenKind } from "inferred-types/types";
import { stripSurround } from "inferred-types/runtime";

/**
 * **getTokenKind**`(token)`
 *
 * Given a `TypeToken`, this function will extract the
 * `kind` variant name.
 */
export function getTokenKind<T extends TypeToken>(token: T): TypeTokenKind {
  const bare = stripSurround("<<", ">>")(token);
  const parts = bare.split("::");
  const kind = parts.pop() as TypeTokenKind;

  return kind;
}
