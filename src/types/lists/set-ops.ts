import { IfContains, IfReadonlyArray, IfSomeEqual } from "../boolean-logic";
import { Narrowable } from "../Narrowable";
import { Mutable } from "../type-conversion/Mutable";
import { UnionToTuple } from "../type-conversion/UnionToTuple";
import { AfterFirst } from "./AfterFirst";
import { First } from "./First";
import { GetEach } from "./GetEach";
import { IndexOf } from "./IndexOf";

/**
 * **SetCandidate**
 * 
 * A _set candidate_ is the base type for a type which can be converted
 * into a "set" (and have set operations applied).
 */
export type SetCandidate = readonly Narrowable[] | Narrowable;

type SetRemovalAcc<
  TSet extends readonly any[],
  TRemoval extends readonly any[],
  Processed extends readonly any[] = [],
> = [] extends TSet
  ? Processed
  : IfSomeEqual<
      First<TSet>, TRemoval,
      SetRemovalAcc<AfterFirst<TSet>, TRemoval, Processed>,
      SetRemovalAcc<AfterFirst<TSet>, TRemoval, readonly [...Processed, First<TSet>]>
    >;

export type SetInput<T extends Narrowable> = T | readonly T[];

/**
 * **IntoSet**`<T>`
 * 
 * Receives a type that extends `SetCandidate` and turns it into a "set"; where
 * a set means it is a readonly array of _narrowable_ values.
 * 
 * ```ts
 * // readonly ["foo", "bar", "baz"]
 * type T1 = UniqueSet<"foo" | "bar" | "baz">;
 * type T2 = UniqueSet<["foo", "bar", "baz"]>;
 * ```
 */
export type IntoSet<T extends SetCandidate> = IfReadonlyArray<
  T, 
  T extends readonly Narrowable[] ? readonly [...T] : never, 
  readonly [...UnionToTuple<Mutable<T>>]
>;


/**
 * **SetRemoval**`<TSet, TRemoval>`
 * 
 * Takes two sets -- `TSet` as the primary set, and `TRemoval` -- and produces the
 * set subtraction of `TSet` minus the elements in `TRemoval`.
 * 
 * **Note:** a "set" can be either an array of values, or a union of values.
 */
export type SetRemoval<
  TSet extends SetCandidate,
  TRemoval extends SetCandidate,
> = SetRemovalAcc<IntoSet<TSet>, IntoSet<TRemoval>>;


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
 * **SetIntersection**`<A,B>`
 * 
 * Takes two sets `A` and `B` and returns the values which exist in both.
 */
export type Intersection<
  A extends SetCandidate,
  B extends SetCandidate,
  TDeref extends string | number | null = null
> = IntersectionAcc<IntoSet<A>, IntoSet<B>, TDeref>;

type UniqueAcc<
  Target extends readonly Narrowable[],
  Compare extends readonly Narrowable[],
  Dereference extends string | number | null,
  Results extends readonly Narrowable[] = readonly []
> = [] extends Target
? Results
: IfContains<
    GetEach<Compare, Dereference>,
    IndexOf<First<Target>, Dereference>,
    UniqueAcc<AfterFirst<Target>, Compare, Dereference, Results>,
    UniqueAcc<AfterFirst<Target>, Compare, Dereference, readonly [...Results, First<Target>]>
>;

/**
 * **Unique**`<A,B>` => [UA,UB]
 * 
 * Type utility which takes two sets `A` and `B` and returns a tuple
 * containing the unique properties found in `A` and `B` respectively.
 * 
 * You may optionally add a _dereferencing_ generic if you want to have the
 * properties uniqueness determined by an index of the items in the two sets.
 * 
 * ```ts
 * // readonly [ [1], [4] ]
 * type T = Unique<[1,2,3],[2,3,4]>;
 * ```
 * 
 * **Related:** `Intersection`
 */
export type Unique<
  A extends SetCandidate,
  B extends SetCandidate,
  TDeref extends string | number | null = null
> = Readonly<[
  Mutable<UniqueAcc<IntoSet<A>, IntoSet<B>, TDeref>>,
  Mutable<UniqueAcc<IntoSet<B>, IntoSet<A>, TDeref>>
]>;

