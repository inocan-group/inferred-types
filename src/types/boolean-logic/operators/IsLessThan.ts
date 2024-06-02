import { AsNumber } from "src/types/index";

type Calc<
  A extends number,
  B extends number,
  Count extends 1[] = []
> =
Count["length"] extends B
  ? false
  : Count["length"] extends A
    ? true
    : Calc<A,B, [...Count, 1]>;

/**
 * **IsLessThan**`<A,B>`
 *
 * Boolean type operator which determines whether `A`
 * is _less than_ `B`.
 *
 * **Note:** does not take negative numbers into account
 */
export type IsLessThan<
  A extends number | `${number}`,
  B extends number | `${number}`
> = Calc<AsNumber<A>, AsNumber<B>>;
