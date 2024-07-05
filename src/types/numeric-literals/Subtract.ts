import {
  Delta,
  IsNegativeNumber,
  NumberLike,
  AsNegativeNumber,
  HaveSameNumericSign,
  Add,
  Abs,
  ParseInt,
  As,
  IsWideType,
  Or
} from "src/types/index";


type ConvertNumber<
  A extends number,
  B extends number
> = HaveSameNumericSign<A,B> extends true
? IsNegativeNumber<A> extends true
  ? Add<Abs<A>,Abs<B>> extends NumberLike
    ? AsNegativeNumber< Add<Abs<A>,Abs<B>> >
    : never
  : Delta<A,B>
: never;

type SummedStrings<
  A extends number,
  B extends number
> = AsNegativeNumber<Add<A,B>>;

type ConvertString<
  A extends `${number}`,
  B extends `${number}`
> = HaveSameNumericSign<A,B> extends true
? IsNegativeNumber<A> extends true
  ? Add<Abs<A>,Abs<B>> extends NumberLike
    ? SummedStrings<ParseInt<Abs<A>>, ParseInt<Abs<B>>>
    : never
  : Delta<A,B>
: never;

type Process<
A extends NumberLike,
B extends NumberLike
> = A extends number
? B extends number
? ConvertNumber<A,B>
: ConvertNumber<A,ParseInt<B>>
: A extends `${number}`
? B extends `${number}`
  ? ConvertString<A,B>
  : ConvertString<A,`${As<B, number>}`>
: never;

/**
 * **Subtract**`<A,B>`
 *
 * Subtracts the value of `B` _from_ `A`.
 */
export type Subtract<
  A extends NumberLike,
  B extends NumberLike
> = Or<[IsWideType<A>, IsWideType<B>]> extends true
? A extends number ? number : `${number}`
: Process<A,B>;
