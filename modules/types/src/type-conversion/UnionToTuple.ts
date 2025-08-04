import type {
    AfterFirst,
    And,
    AnyObject,
    First,
    Scalar,
} from "inferred-types/types";

type HasBoolean<
    T extends readonly unknown[],
    TTrue extends boolean = false,
    TFalse extends boolean = false,
> = [] extends T
    ? And<[TTrue, TFalse]>
    : HasBoolean<AfterFirst<T>, First<T> extends true ? true : TTrue, First<T> extends false ? true : TFalse>;

/**
 * UnionToIntersection<{ foo: string } | { bar: string }> =
 *  { foo: string } & { bar: string }.
 */
type UnionToIntersection<U> = (
    U extends undefined | Scalar | AnyObject ? (arg: U) => 0 : never
) extends (arg: infer I) => 0
    ? I
    : never;

/**
 * LastInUnion<1 | 2> = 2.
 */
export type LastInUnion<U> = UnionToIntersection<
    U extends undefined | Scalar | AnyObject ? (x: U) => 0 : never
> extends (x: infer L) => 0
    ? L
    : never;

// Optimized Process function with reduced recursion depth and early termination
type Process<
    U extends undefined | Scalar | AnyObject,
    Acc extends unknown[] = [],
    Depth extends number = 0,
> = [U] extends [never]
    ? Acc
    : Depth extends 10  // Limit recursion depth to prevent infinite recursion
        ? [...Acc, U]  // Truncate at depth limit
        : Process<Exclude<U, LastInUnion<U>>, [...Acc, LastInUnion<U>], [Depth] extends [never] ? 0 : [1,2,3,4,5,6,7,8,9,10][Depth]>;

type FilterBoolean<
    T extends readonly unknown[],
    R extends readonly unknown[] = [],
> = [] extends T
    ? R
    : FilterBoolean<AfterFirst<T>, First<T> extends boolean ? R : [...R, First<T>]>;

/**
 * **UnionToTuple**`<1 | 2>` => [1, 2]
 *
 * Converts union members into a tuple.
 *
 * **Related**: `UnionArrayToTuple`
 */
export type UnionToTuple<
    U extends undefined | Scalar | AnyObject,
> = HasBoolean<Process<U>> extends true
    ? [...FilterBoolean<Process<U>>, boolean]
    : Process<U>;
