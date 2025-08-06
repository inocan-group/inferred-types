import { NotFilter } from "inferred-types/types";
import { As, HasFalse, HasTrue } from "types/boolean-logic";

/**
 * UnionToIntersection<{ foo: string } | { bar: string }> =
 *  { foo: string } & { bar: string }.
 */
type UnionToIntersection<U> = (
    U extends unknown ? (arg: U) => 0 : never
) extends (arg: infer I) => 0
    ? I
    : never;

/**
 * LastInUnion<1 | 2> = 2.
 */
type LastInUnion<U> = UnionToIntersection<
    U extends unknown ? (x: U) => 0 : never
> extends (x: infer L) => 0
    ? L
    : never;


/**
 * **UnionToTuple**`<1 | 2>` => [1, 2]
 *
 * Converts union members into a tuple.
 *
 * **Related**: `UnionArrayToTuple`
 */
export type UnionToTuple<
    U,
    Last = LastInUnion<U>
> = [U] extends [never]
    ? []
    : [...UnionToTuple<Exclude<U, Last>>, Last];
