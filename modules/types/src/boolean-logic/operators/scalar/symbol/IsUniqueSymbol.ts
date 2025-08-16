import type { IsAny, IsEqual, IsNever, IsUnion } from "inferred-types/types";

/**
 * **IsUniqueSymbol**`<T>`
 *
 * Boolean operator which is true if T is a **unique symbol** type:
 *
 *  - it extends `symbol`
 *  - it's not the wide `symbol` itself
 *  - it's not a union (so e.g., `A | B` where A,B are distinct unique symbols is false)
 *  - excludes `any` / `never`
 *
 * **Related:** `IsWideSymbol`
 */
export type IsUniqueSymbol<T>
  = IsAny<T> extends true
      ? false
      : IsNever<T> extends true
          ? false
          // must be a subtype of symbol
          : [T] extends [symbol]
              ? IsEqual<T, symbol> extends true
                  ? false
                  : IsUnion<T> extends true
                      ? false
                      : true
              : false;
