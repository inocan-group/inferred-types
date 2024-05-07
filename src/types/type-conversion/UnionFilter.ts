import { Tuple } from "../base-types";
import { IfUnion } from "../boolean-logic/branching/IfUnion";
import { Filter } from "../lists/Filter";
import { TupleToUnion } from "./TupleToUnion";
import { UnionToTuple } from "./UnionToTuple";


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
: IfUnion<
    U,
    Reduce<UnionToTuple<U>,E>,
    U extends E
        ? never
        : U
  >

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
: IfUnion<
    U,
    Isolate<UnionToTuple<U>,E>,
    U extends E
        ? U
        : never
  >
