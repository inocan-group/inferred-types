import type { NumberLike } from "types/numeric-literals/NumberLike";
import type { FourDigitYear } from "types/datetime/general";
import type { IsGreaterThan, IsGreaterThanOrEqual } from "types/boolean-logic/operators/scalar/numeric/IsGreaterThan";

type Generic<A extends NumberLike, B extends NumberLike> = IsGreaterThan<A, B>;
type GenericOrEqual<A extends NumberLike, B extends NumberLike> = IsGreaterThanOrEqual<A, B>;
type Probe = [
    Generic<10000, 9999>,
    Generic<FourDigitYear<"2020">, FourDigitYear<"2012">>,
    GenericOrEqual<100, 100>,
];
