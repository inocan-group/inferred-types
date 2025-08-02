import type { AnyFunction, IsAny, IsEqual, IsNever, IsUnknown } from "inferred-types/types";

type RegularFn<Fn> = Fn extends ((...args: any[]) => any)
    ? (...args: Parameters<Fn>) => ReturnType<Fn>
    : false;

/**
 * **IsLiteralFn**`<TFn>`
 *
 * A boolean operator which checks that `TFn`:
 *
 * - is a function
 * - does not use generics to narrow input parameters
 *
 * **Related:** `LiteralFn`, `IsNarrowFn`
 */
export type IsStaticFn<T> = [IsAny<T>] extends [true]
    ? false
: [IsNever<T>] extends [true]
    ? false
: [IsUnknown<T>] extends [true]
    ? boolean

: T extends AnyFunction
    ? IsEqual<RegularFn<T>, T>
    : false;
