import type { IsAny, IsNever, IsUnknown, Thenable } from "inferred-types/types";

/**
 * Boolean operator which tests whether `T` is a
 * `Thenable` variable (aka, promise-like).
 */
export type IsThenable<T> =
[IsAny<T>] extends [true]
    ? false
: [IsNever<T>] extends [true]
    ? false
: [IsUnknown<T>] extends [true]
    ? boolean
: T extends Thenable
    ? true
    : false;

export type IsStrictPromise<T> = [IsAny<T>] extends [true]
    ? false
: [IsNever<T>] extends [true]
    ? false
: [IsUnknown<T>] extends [true]
    ? boolean

: T extends {
    then: (onfulfilled?: (value: any) => any, onrejected?: (reason: any) => any) => any;
    finally?: (onfinally?: () => void) => any;
}
    ? true
    : false;
