import type { TypeToken, TypeTokenKind } from "inferred-types/types";
import { TT_KIND_VARIANTS } from "inferred-types/constants";
import { isAtomicKind, isSetBasedKind, isString, stripSurround } from "inferred-types/runtime";

/**
 * A _multi-granularity_ type guard for validating whether `val` is
 * a `TypeToken`.
 *
 * - when used without the `kind` parameter it will check whether `val`
 * is _any_ kind of `TypeToken`
 * - specifying a kind will narrow the check to that specific kind variant
 */
export function isTypeToken<T extends TypeTokenKind = TypeTokenKind>(val: unknown, kind?: T): val is TypeToken<T> {
  if (isString(val) && val.startsWith("<<") && val.endsWith(">>")) {
    const stripped = stripSurround("<<", ">>")(val);

    if (TT_KIND_VARIANTS.some(k => stripped.startsWith(k))) {
      if (kind) {
        if (isAtomicKind(kind)) {
          return val === `<<${kind}>>`;
        }
        else if (isSetBasedKind(kind)) {
          return val.startsWith(`<<${kind}::`);
        }
        else {
          return val === `<<${kind}>>`
            || val.startsWith(`<<${kind}::`);
        }
      }
      else {
        // broad check if _any_ token
        return true;
      }
    }

    return false;
  }

  return false;
}

/**
 * type guard which validates that `val` is a `TypeTokenKind`
 */
export function isTypeTokenKind(val: unknown): val is TypeTokenKind {
  return !!(isString(val) && TT_KIND_VARIANTS.some(i => i ===val));
}
