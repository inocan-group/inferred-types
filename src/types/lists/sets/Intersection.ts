import { AfterFirst, First, GetEach, IndexOf } from "types/lists";
import { IfContains, IsEqual } from "types/boolean-logic";
import { Narrowable } from "types/literals/Narrowable";
import { SetCandidate } from "./SetCandidate";
import { IntoSet } from "./IntoSet";
import { Find } from "../Find";



type IntersectionAcc<
A extends readonly Narrowable[],
B extends readonly Narrowable[],
TDeref extends string | number | null = null,
Intersection extends readonly Narrowable[] = readonly []
> = [] extends A
? Intersection
: TDeref extends null
  ? IfContains<
      B, First<A>, // if B tuple contains first element of A
      IntersectionAcc<AfterFirst<A>, B, TDeref, readonly [...Intersection, First<A>]>,
      IntersectionAcc<AfterFirst<A>, B, TDeref, Intersection>
    >
  : IfContains<
      GetEach<B, TDeref>, IndexOf<First<A>, TDeref>, // Deref: if B tuple contains first element of A
      Find<B, IndexOf<First<A>, TDeref>, TDeref> extends infer Found
        ? IsEqual<Found, First<A>> extends true
          ? IntersectionAcc<AfterFirst<A>, B, TDeref, readonly [...Intersection, First<A>]>
          : IntersectionAcc<AfterFirst<A>, B, TDeref, readonly [...Intersection, First<A>, Found]>
        : IntersectionAcc<AfterFirst<A>, B, TDeref, readonly [...Intersection, First<A>]>,
      IntersectionAcc<AfterFirst<A>, B, TDeref, Intersection>
    >;

/**
* **Intersection**`<A,B, [Deref]>`
* 
* Takes two sets `A` and `B` and returns the values which exist in both.
*/
export type Intersection<
  A extends SetCandidate,
  B extends SetCandidate,
  TDeref extends string | number | null = null
> = IntersectionAcc<IntoSet<A>, IntoSet<B>, TDeref>;
