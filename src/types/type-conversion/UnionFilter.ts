import { Tuple } from "../base-types";
import { IfNever } from "../boolean-logic/branching/IfNever";
import { IfUnion } from "../boolean-logic/branching/IfUnion";
import { RemoveNever } from "../lists";
import { First } from "../lists/First";
import { Second } from "../lists/Second";
import { TupleToUnion } from "./TupleToUnion";
import { UnionShift } from "./UnionShift";
import { UnionToTuple } from "./UnionToTuple";

// type Process<
//     U,
//     E,
//     TTuple extends Tuple = []
// > = [U] extends [never]
// ? never
// : IfNever<
//     First<UnionShift<U>>,
//     // we have processed all elements of `U`
//     TupleToUnion<TTuple>,
//     Process<Second<UnionShift<U>>, E, [...TTuple,First<UnionShift<U>>]>
// >

type Filter<
    T extends Tuple,
    E
> = TupleToUnion<
RemoveNever<{
    [K in keyof T]: T[K] extends E
        ? never
        : T[K]
}>>;

type Isolate<
    T extends Tuple,
    E
> = TupleToUnion<
RemoveNever<{
    [K in keyof T]: T[K] extends E
        ? T[K]
        : never
}>>;

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
    Filter<UnionToTuple<U>,E>,
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
