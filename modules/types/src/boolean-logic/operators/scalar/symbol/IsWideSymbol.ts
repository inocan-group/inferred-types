import type { IsAny, IsEqual, IsNever, IsUnion } from "inferred-types/types";

/**
 * **IsWideSymbol**`<T>`
 *
 * Boolean operator which is true if T is a **wide** symbol type:
 *
 *  - it extends `symbol`
 *  - it's not the wide `symbol` itself
 *  - it's not a union (so e.g., `A | B` where A,B are unique symbols is false)
 *  - note that any unique symbol in a union with the wide symbol type widens the
 * type immediately to a wide symbol
 *  - excludes `any` / `never`
 *
 * **Related:** `IsUniqueSymbol`
 */
export type IsWideSymbol<T>
= [IsAny<T>] extends [true] ? false
    : [IsNever<T>] extends [true] ? false
        : [T] extends [symbol]
            ? [IsEqual<T, symbol>] extends [true]
                ? [IsUnion<T>] extends [true]
                    ? false
                    : true
                : false
            : false;
