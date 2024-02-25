import { AsArray, AsString, ErrorCondition, IfAllLiteral, IfEqual, Split, Tuple } from "src/types/index";

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
> = ErrorCondition<
  "invalid-use",
  "invalid use of mixed type",
  {context: {A: A; B: B}; library: "OfEqualLength"}
>;

type NonLiteral<
A extends Tuple | string,
B extends Tuple | string
> = ErrorCondition<
  "non-literal",
  "OfEqualLength<A,B> expects both strings -- when passed strings -- to be literal strings not WIDE string types!",
  {context: { A: A; B: B}; library: "OfEqualLength"}
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
        Process<AsArray<Split<AsString<A>>>,AsArray<Split<AsString<B>>>>,
        NonLiteral<A,B>
      >
    : MixedType<A,B>
  : A extends Tuple
    ? B extends Tuple
      ? Process<A,B>
      : MixedType<A,B>
  : MixedType<A,B>;

