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

type Process<
    U extends undefined | Scalar | AnyObject,
    Last = LastInUnion<U>,
> = [U] extends [never]
    ? []
    : [...Process<Exclude<U, Last>>, Last];

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
