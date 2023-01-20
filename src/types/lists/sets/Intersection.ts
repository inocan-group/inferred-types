import { AfterFirst, First } from "src/types/lists";
import { IfContains } from "src/types/boolean-logic";
import { Narrowable } from "src/types/Narrowable";
import { SetCandidate } from "./SetCandidate";
import { IntoSet } from "./IntoSet";



type IntersectionAcc<
A extends readonly Narrowable[],
B extends readonly Narrowable[],
TDeref extends string | number | null = null,
Intersection extends readonly Narrowable[] = readonly []
> = [] extends A
? Intersection
: IfContains<
    B, First<A>, // if B tuple contains first element of A
    IntersectionAcc<AfterFirst<A>, B, TDeref, readonly [...Intersection, First<A>]>,
    IntersectionAcc<AfterFirst<A>, B, TDeref, Intersection>
  >;

/**
* **Intersection**`<A,B>`
* 
* Takes two sets `A` and `B` and returns the values which exist in both.
*/
export type Intersection<
  A extends SetCandidate,
  B extends SetCandidate,
  TDeref extends string | number | null = null
> = IntersectionAcc<IntoSet<A>, IntoSet<B>, TDeref>;
