import type {
    AnyFunction,
    FnMeta,
    IsAny,
    IsEqual,
    IsNever,
    IsUnknown,
    TypedFunction
} from "inferred-types/types";

/**
 * Reconstructs a _non-generic_ function from `Fn`'s parameters and return type.
 *
 * The return type is normalized: when `ReturnType<Fn>` collapses to `any` — which
 * TypeScript does for generic functions whose constraint is a **union** and whose
 * return weaves the type parameter into a template literal (e.g.
 * `<T extends "Bob" | "Nancy">(name: T) => `hi ${T}``) — we substitute `unknown`.
 * Leaving `any` in place would let the reconstruction compare _equal_ to the
 * original generic signature (an `any` return is bilaterally assignable), which
 * would misclassify a narrowing function as static.
 */
type RegularFn<Fn> = Fn extends ((...args: any[]) => any)
    ? (...args: Parameters<Fn>) => (
        [IsAny<ReturnType<Fn>>] extends [true] ? unknown : ReturnType<Fn>
    )
    : false;

// Check if T has properties beyond being a function (i.e., is an intersection)
type HasExtraProperties<T> = T extends (...args: any[]) => any
    ? keyof T extends never
        ? false
        : true
    : false;

// Extract properties from a function intersection
type ExtractProps<T> = T extends (...args: any[]) => any
    ? Omit<T, keyof ((...args: any[]) => any)>
    : never;

type IsStaticCheck<T>
    = [IsEqual<RegularFn<T>, T>] extends [true]
        ? true
        : HasExtraProperties<T> extends false
            ? false // No extra properties and not equal to RegularFn: must be generic
            : [IsEqual<RegularFn<T> & ExtractProps<T>, T>] extends [true]
                    ? true // RegularFn + props = T, so it's a static function with properties
                    : false; // Generic function with properties

/**
 * **IsStaticFn**`<TFn>`
 *
 * A boolean operator which checks that `TFn`:
 *
 * - is a function
 * - _does not_ use generics to narrow input parameters
 *
 * **Related:** `LiteralFn`, `IsNarrowFn`
 */
export type IsStaticFn<T> = [IsAny<T>] extends [true]
    ? boolean
    : [IsNever<T>] extends [true]
            ? false
            : [IsUnknown<T>] extends [true]
                    ? boolean

                    : T extends AnyFunction
                        ? T extends TypedFunction
                            ? IsStaticCheck<T> extends true
                                ? FnMeta<T>["params"]["length"] extends 0
                                    ? false
                                    : true
                                : false
                            : IsStaticCheck<T> extends true
                                ? true
                                : false
                        : false;
