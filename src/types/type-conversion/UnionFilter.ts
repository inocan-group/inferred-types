import { UnionToTuple, TupleToUnion, Filter, IsUnion, Tuple } from "src/types/index";


type Reduce<
    T extends Tuple,
    E
> = TupleToUnion<
    Filter<{
        [K in keyof T]: T[K] extends E
            ? never
            : T[K]
    }, never>
>;

type Isolate<
    T extends Tuple,
    E
> = TupleToUnion<
    Filter<{
        [K in keyof T]: T[K] extends E
            ? T[K]
            : never
    }, never>
>;

/**
 * **UnionFilter**`<U, E>`
 *
 * A type utility which receives a union type `U` and then eliminates
 * all elements of the union which _extend_ `E`.
 *
 * **Related:** `UnionRetain`
 */
export type UnionFilter<U, E> = [U] extends [never]
? never
: [IsUnion<U>] extends [true]
    ? Reduce<UnionToTuple<U>,E>
    : [U] extends [E]
        ? never
        : U;

/**
 * **UnionRetain**`<U, E>`
 *
 * A type utility which receives a union type `U` and then eliminates
 * all elements of the union which _do not extend_ `E`.
 *
 * **Related:** `UnionFilter`
 */
export type UnionRetain<U, E> = [U] extends [never]
? never
: IsUnion<U> extends true
    ? Isolate<UnionToTuple<U>,E>
    : U extends E
        ? U
        : never;
