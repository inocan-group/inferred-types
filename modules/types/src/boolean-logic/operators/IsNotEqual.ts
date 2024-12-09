import { IsEqual } from "inferred-types/types";
/**
 * **NotEqual**`<X,Y>`
 *
 * Type utility which tests whether two types -- `X` and `Y` -- are _not_ exactly the same type
 */
export type IsNotEqual<X, Y> = true extends IsEqual<X, Y> ? false : true;
