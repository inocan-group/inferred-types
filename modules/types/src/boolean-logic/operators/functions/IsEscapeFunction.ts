import type { EscapeFunction, FnKeyValue, IsAny, IsNever } from "inferred-types/types";
import { TypedFunction } from "inferred-types/types";

/**
 * **IsEscapeFunction**
 *
 * Boolean operator that validates that `T` extends `EscapeFunction`
 */
export type IsEscapeFunction<T>
= [IsAny<T>] extends [true] ? false
    : [IsNever<T>] extends [true] ? false
        : T extends EscapeFunction
            ? FnKeyValue<T> extends { escape: true }
                ? true
                : false
            : false;
