import type { IsNever } from "inferred-types/types";

type Process<T> = [IsNever<T>] extends [true]
    ? false
    : [T] extends [readonly unknown[]]
        ? [number] extends [T["length"]]
            ? false
            : true
        : false;

/**
 * **IsTuple**`<T>`
 *
 * Boolean operator which tests whether the given `T` is
 * a _tuple_ value where a tuple is defined as:
 *
 * - a _finite_ and _known_ list of elements
 *
 * **Note:**
 * - this _does_ include a list of zero elements
 * - types such as `string[]`, etc. are _not_ tuples as they
 * do not discretely specify a length of elements
 */
export type IsTuple<T> = [Process<T>] extends [boolean]
    ? Process<T>
    : never;
