import { IsEqual } from "inferred-types/dist/types/index";

type Calc<
A extends number,
B extends number,
Count extends 1[] = []
> = Count["length"] extends B
? false
: Count["length"] extends A
  ? true
  : IsEqual<A,B> extends true
    ? true
    : Calc<A,B, [...Count, 1]>;

/**
 * **LessThanOrEqual**`<A,B>`
 *
 * Boolean operator which checks whether `A` is
 * _less than_ `B`.
 *
 * - Note: this solution is cheap and cheerful and doesn't
 * try to address negative numbers or other edge cases
 */
export type LessThanOrEqual<A extends number,B extends number> = Calc<A,B>;
