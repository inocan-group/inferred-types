import { And, If, IsEqual, IsLiteral, Length } from "src/types/index";



/**
 * **AreSameLength**`<A,B>`
 * 
 * Tests whether `A` and `B` are of equal length. Generics should
 * be a `Tuple` or a string but not a combination of the two.
 */
export type AreSameLength<
  A extends string | readonly unknown[],
  B extends string | readonly unknown[]
> = If<
  And<[IsLiteral<A>, IsLiteral<B>]>,
  IsEqual<Length<A>, Length<B>>,
  boolean
>


