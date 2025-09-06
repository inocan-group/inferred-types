import type { IsAny, IsNever } from "inferred-types/types";

/**
 * **IsUndefined**
 *
 * Boolean type utility returns `true` if `T` is undefined; `false` otherwise
 */
export type IsUndefined<T>
    = [IsNever<T>] extends [true] ? false
        : [IsAny<T>] extends [true] ? boolean
            : [T] extends [undefined] ? true
                : [Extract<T, undefined>] extends [never] ? false
                    : boolean;
