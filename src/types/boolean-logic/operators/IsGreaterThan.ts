import { GreaterThan , ToNumber } from "src/types";

/**
 * **IsGreaterThan**`<A,B>`
 * 
 * Boolean type operator which determines whether `A`
 * is _greater than_ `B`.
 */
export type IsGreaterThan<
  A extends number | `${number}`,
  B extends number | `${number}`
> = GreaterThan<
  A extends number ? A : ToNumber<A>,
  B extends number ? B : ToNumber<B>
> extends true ? true : false;
