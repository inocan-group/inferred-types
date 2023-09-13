
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
 * **GreaterThan**`<A,B>`
 * 
 * Boolean operator which checks whether `A` is 
 * _greater than_ `B`.
 * 
 * - Note: this solution is cheap and cheerful and doesn't
 * try to address negative numbers or other edge cases
 */
export type GreaterThan<
  A extends number,
  B extends number
> = Calc<A,B>;
