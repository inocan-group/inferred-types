import { AsNumber, If, IsEqual, Or } from "src/types/index";

type Calc<
  A extends number,
  B extends number,
  Count extends 1[] = []
> =
Count["length"] extends A
  ? false
  : Count["length"] extends B
    ? true
    : Calc<A,B, [...Count, 1]>;

/**
 * **IsGreaterThan**`<A,B>`
 *
 * Boolean type operator which determines whether `A`
 * is _greater than_ `B`.
 *
 * **Note:** does not take negative numbers into account
 */
export type IsGreaterThan<
  A extends number | `${number}`,
  B extends number | `${number}`
> = If<
  Or<[IsEqual<A,number>, IsEqual<B,number>, IsEqual<A,`${number}`>, IsEqual<B,`${number}`>]>,
  boolean,
  Calc<AsNumber<A>, AsNumber<B>>
>;
