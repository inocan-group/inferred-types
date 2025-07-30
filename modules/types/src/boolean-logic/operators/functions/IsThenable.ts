import type { Thenable } from "inferred-types/types";

/**
 * Boolean operator which tests whether `T` is a
 * `Thenable` variable (aka, promise-like).
 */
export type IsThenable<T> = T extends Thenable
    ? true
    : false;

export type IsStrictPromise<T> = T extends {
    then: (onfulfilled?: (value: any) => any, onrejected?: (reason: any) => any) => any;
    finally?: (onfinally?: () => void) => any;
}
    ? true
    : false;
