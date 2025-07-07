import type { TypedFunction, First, AfterFirst, AnyFunction } from "inferred-types/types";

/**
 * **HasTypedFunctionKeys**
 *
 * A type operator which tests whether `T` is a dictionary and
 * whether `K` keys are typed functions.
 *
 * **Related:** `HasFunctionKeys`
 */
export type HasTypedFunctionKeys<
    T,
    K extends readonly string[]
> = [] extends K
    ? true
    : First<K> extends keyof T
    ? T[First<K>] extends TypedFunction
    ? HasTypedFunctionKeys<T, AfterFirst<K>>
    : false
    : false;


/**
 * **HasFunctionKeys**
 *
 * A type operator which tests whether `T` is a dictionary and
 * whether `K` keys are functions.
 *
 * **Related:** `HasTypedFunctionKeys`
 */
export type HasFunctionKeys<
    T,
    K extends readonly string[]
> = [] extends K
    ? true
    : First<K> extends keyof T
    ? T[First<K>] extends AnyFunction
    ? HasFunctionKeys<T, AfterFirst<K>>
    : false
    : false;

