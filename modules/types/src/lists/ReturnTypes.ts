import type { TypedFunction } from "inferred-types/types";

/**
 * **ReturnTypes**`<T>`
 *
 * Given any Tuple, this utility will return a _union_ type
 * that represents all the possible _return types_ from functions found
 * in the array. Non-function types will be ignored as will functions
 * which don't return a boolean value.
 *
 * **See Also**: `LogicalReturns`, `TruthyReturns`
 */
export type ReturnTypes<T extends readonly unknown[]> = {
    [K in keyof T]: T[K] extends TypedFunction
        ? ReturnType<T[K]> extends boolean
            ? ReturnType<T[K]>
            : never
        : never;
};
