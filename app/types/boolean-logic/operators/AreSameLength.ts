import {
  AsString,
  Chars,
  IsEqual,
  IsStringLiteral,
  IsTuple
} from "src/types/index";



/**
 * **AreSameLength**`<A,B>`
 *
 * Tests whether `A` and `B` are of equal length. Generics should
 * be a `Tuple` or a string but not a combination of the two.
 */
export type AreSameLength<
  A extends string | readonly unknown[],
  B extends string | readonly unknown[]
> = IsStringLiteral<A> extends true
? IsStringLiteral<B> extends true
  ? IsEqual<Chars<AsString<A>>["length"], Chars<AsString<B>>["length"]>
: boolean
: IsTuple<A> extends true
    ? IsTuple<B> extends true
        ? IsEqual<A["length"], B["length"]>
        : IsStringLiteral<B> extends true ? IsEqual<A["length"], B["length"]>
        : boolean
: boolean;
