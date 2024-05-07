import type { 
  GetEach, 
  IfContains, 
  IfNull,
  Get,
  IfContainer,
  ToContainer,
  Filter,
} from "src/types/index";

type _NoDeref<
  A extends readonly unknown[],
  B extends readonly unknown[],
> = Readonly<Filter<{
  [K in keyof A]: IfContains<B, A[K], A[K], never>
}, never>>;

type _WithDeref<
  A extends readonly unknown[],
  B extends readonly unknown[],
  AValues extends readonly unknown[],
  BValues extends readonly unknown[],
  TDeref extends string | number,
> = [
  Filter<{
    [K in keyof A]: IfContains<
      BValues,
      IfContainer<
        A[K],
        // get the dereferenced prop on A
        Get<
          ToContainer<A[K]>,
          TDeref
        >,
        // not a container so can't be deref'ed
        never
      >,
      A[K],
      never
    >
  }, never>,
  Filter<{
    [K in keyof B]: IfContains<
      AValues,
      IfContainer<
        B[K],
        Get<
          ToContainer<B[K]>,
          TDeref
        >,
        never
      >,
      B[K],
      never
    >
  }, never>,
];



/**
  * **Intersection**`<A,B, [Deref]>`
  * 
  * Takes two sets `A` and `B` and returns a their _intersection_ where:
  * 
  * 1. if no `TDref` is set then the results are simply an array of the elements
  * which both sets contained. In this mode, objects and sub-arrays are compared as
  * their reference value so only those items which have a common ref will match.
  * 
  * 2. if a `TDeref` property is provided then _comparisons_ are made on the 
  * dereferenced value of the elements of each set but because the full values are
  * returned it's quite possible that `A` and `B` share a dereferenced value but other
  * properties are _not_ the same so for this reason the resultant type is a tuple: `readonly [ AIntersect, BIntersect ]`
  * 
  * **Related:** `Unique`, `IntersectingKeys`
  */
export type Intersection<
  A extends readonly unknown[],
  B extends readonly unknown[],
  TDeref extends string | number | null = null
> = IfNull<
  TDeref, 
  // no dereferencing
  _NoDeref<A,B>,
  // dereference the array elements
  _WithDeref<
    A, 
    B,
    GetEach<A, TDeref> & readonly unknown[],
    GetEach<B, TDeref> & readonly unknown[],
    TDeref & (string | number)
  >
>;
