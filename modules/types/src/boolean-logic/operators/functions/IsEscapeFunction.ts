import { EscapeFunction, FnKeyValue, IsAny, IsNever, TypedFunction } from "inferred-types/types";

/**
 * **IsEscapeFunction**
 *
 * Boolean operator that validates that `T` extends `EscapeFunction`
 */
export type IsEscapeFunction<T> =
[IsAny<T>] extends [true] ? false
: [IsNever<T>] extends [true] ? false
: T extends EscapeFunction
    ? FnKeyValue<T> extends { escape: true }
            ? true
            : false
    : false;
