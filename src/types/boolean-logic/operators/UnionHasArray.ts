import { HasArray, IsUnion, UnionToTuple } from "inferred-types/dist/types/index";


type Process<
  T extends readonly unknown[]
> = HasArray<T> extends true
? true
: false;


/**
 * **UnionHasArray**`<T>`
 *
 * A boolean operator which tests whether T is:
 *
 * - indeed a _union_ type
 * - and that one of the elements of the union is an array
 * of some sort.
 */
export type UnionHasArray<T> = IsUnion<T> extends true
? Process<UnionToTuple<T>>
: false;
