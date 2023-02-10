import { 
  IfContains , 
  Narrowable , 
  AfterFirst, 
  First, 
  GetEach, 
  IndexOf , 
  Mutable, 
  AnyObject,
  WithoutKeys,
  Intersection,
  Key
} from "../../../types";
import { SetCandidate } from "./SetCandidate";
import { IntoSet } from "./IntoSet";


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
  A extends AnyObject | readonly unknown[],
  B extends AnyObject | readonly unknown[],
  TDeref extends string | number | null = null
> = A extends AnyObject
  ? B extends AnyObject
    ? Intersection<A,B> extends readonly Key[]

      ? readonly [ 
          WithoutKeys<A, Intersection<A,B>>, 
          WithoutKeys<B, Intersection<A,B>>  
        ]
      : readonly [ A, B]
    : A extends readonly unknown[]
      ? B extends readonly unknown[]
        ? Readonly<[
          Mutable<UniqueAcc<A, B, TDeref>>,
          Mutable<UniqueAcc<B, A, TDeref>>
          ]>
        : never
      : never
  : never;

  
  

