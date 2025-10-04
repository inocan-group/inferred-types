import type {
    AnyFunction,
    FnMeta,
    IsAny,
    IsEqual,
    IsNever,
    IsUnknown,
    TypedFunction
} from "inferred-types/types";

type RegularFn<Fn> = Fn extends ((...args: any[]) => any)
    ? (...args: Parameters<Fn>) => ReturnType<Fn>
    : false;

// Check if T has properties beyond being a function (i.e., is an intersection)
type HasExtraProperties<T> = T extends (...args: any[]) => any
    ? keyof T extends never
        ? false
        : true
    : false;

type IsStaticCheck<T> =
    [IsEqual<RegularFn<T>, T>] extends [true]
        ? true
    : HasExtraProperties<T> extends true
        ? [T] extends [RegularFn<T>]
            ? true  // Has extra properties and extends the regular function: intersection type with static function
            : false // Has extra properties but doesn't extend regular function: shouldn't happen
        : false;  // No extra properties and not equal to RegularFn: must be generic

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
            : boolean
        : false;
