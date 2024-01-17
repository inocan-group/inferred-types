import { 
  IfContains,
  AfterFirst, 
  First, 
  GetEach,
  Mutable,
  Get,
} from "src/types/index";

type UniqueAcc<
  Target extends readonly unknown[],
  Compare extends readonly unknown[],
  Dereference extends string | number | null,
  Results extends readonly unknown[] = readonly []
> = [] extends Target
? Results
: IfContains<
    GetEach<Compare, Dereference> & readonly unknown[],
    Get<First<Target>, Dereference>,

    UniqueAcc<AfterFirst<Target>, Compare, Dereference, Results>,
    UniqueAcc<AfterFirst<Target>, Compare, Dereference, readonly [...Results, First<Target>]>
  >;

/**
* **Unique**`<A,B, [TDeref]>` => [UA,UB]
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
export type UniqueOLD<
  A extends readonly unknown[],
  B extends readonly unknown[],
  TDeref extends string | number | null = null
> = A extends readonly unknown []
? Readonly<
    [
      Mutable<UniqueAcc<A, B, TDeref>>,
      Mutable<UniqueAcc<B, A, TDeref>>
    ]
  >
: A extends unknown []
    ? [
      Mutable<UniqueAcc<A, B, TDeref>>,
      Mutable<UniqueAcc<B, A, TDeref>>
    ]
    : never;

type Process<
  TSet extends readonly unknown[],
  TUnique extends readonly unknown[] = []
> = [] extends TSet
? TUnique
: Process<
    AfterFirst<TSet>,
    IfContains<
      TUnique, First<TSet>,
      TUnique,
      [...TUnique, First<TSet>]
    >
  >;



/**
 * **Unique**`<TSet>`
 * 
 * Given a tuple/set of values, this utility will reduce this tuple to
 * unique values in the set.
 */
export type Unique<
  TSet extends readonly unknown[]
> = Process<TSet>;
