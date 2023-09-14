import { AsString, ErrorCondition, IfAllLiteral, IfEqual, Split, Tuple } from "src/types";

type Process<
  A extends Tuple,
  B extends Tuple
> = IfEqual<
  A["length"], B["length"],
  true,
  false
>;

type MixedType<
  A extends Tuple | string,
  B extends Tuple | string
> = ErrorCondition<"invalid-use", "OfEqualLength<A,B> expects either two strings or two Tuples but not a combination!","OfEqualLength", {A: A; B: B}>;

type NonLiteral<
A extends Tuple | string,
B extends Tuple | string
> = ErrorCondition<
  "non-literal",
  "OfEqualLength<A,B> expects both strings -- when passed strings -- to be literal strings not WIDE string types!",
  "OfEqualLength",
  { A: A; B: B}
>;


/**
 * **OfSameLength**`<A,B>`
 * 
 * Tests whether `A` and `B` are of equal length. Both generics should
 * be a `Tuple` or a string but not a combination of the two.
 */
export type OfSameLength<
  A extends Tuple | string,
  B extends Tuple | string
> = 
A extends string
  ? B extends string
    ? IfAllLiteral<
        [A,B],
        Process<Split<AsString<A>>,Split<AsString<B>>>,
        NonLiteral<A,B>
      >
    : MixedType<A,B>
  : A extends Tuple
    ? B extends Tuple
      ? Process<A,B>
      : MixedType<A,B>
  : MixedType<A,B>;

