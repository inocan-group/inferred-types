import type { AnyFunction, FnMeta, TypedFunction } from "inferred-types/types";

// Check if T has properties beyond being a function (i.e., is an intersection with properties)
type HasExtraProperties<T> = T extends (...args: any[]) => any
    ? keyof T extends never
        ? false
        : true
    : false;

/**
 * **OnlyFn**`<T>`
 *
 * Takes a function `T` and strips away any key/value pair that may
 * be tied to it, leaving only the function.
 *
 * This utility extracts just the function signature, removing any
 * intersection properties while preserving:
 * - Parameter names and types (including optional/rest parameters)
 * - Return type
 * - Generic type parameters (for generic functions)
 */
export type OnlyFn<T extends AnyFunction> = HasExtraProperties<T> extends true
    ? T extends TypedFunction
        ? (...args: FnMeta<T>["params"]) => FnMeta<T>["returns"]
        : T extends (...args: infer P) => infer R
            ? (...args: P) => R
            : Function
    : T;  // No extra properties: return the function as-is (preserves generics)

