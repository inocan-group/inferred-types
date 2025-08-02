import type { IsAny, IsNever, IsUnknown, TypedFunction } from "inferred-types/types";

/**
 * **Returns**`<TFn,TExpected>`
 *
 * Boolean type utility which detects whether `TFn` is a function
 * and _extends_ `TExpected` in it's return type.
 */
export type Returns<
    T,
    TExpected,
> =
[IsAny<T>] extends [true]
    ? false
: [IsNever<T>] extends [true]
    ? false
: [IsUnknown<T>] extends [true]
    ? boolean
: T extends TypedFunction
    ? ReturnType<T> extends TExpected
        ? true
        : false
    : false;
