import { First, AfterFirst, Contains, If } from "src/types/index"

type Process<
  A extends readonly unknown[],
  B extends readonly unknown[],
> = [] extends A
? true
: If<
    Contains<B,First<A>>,
    Process<AfterFirst<A>,B>,
    false
  >;


/**
 * **SameElements**`<A,B>`
 * 
 * Compares two lists to see if they have the same elements.
 */
export type SameElements<
  A extends readonly unknown[],
  B extends readonly unknown[]
> = A["length"] extends B["length"]
? Process<A,B>
: false;
