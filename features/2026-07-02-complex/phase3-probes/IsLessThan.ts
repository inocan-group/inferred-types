import type { NumberLike } from "types/numeric-literals/NumberLike";
import type { IsLessThan, IsLessThanOrEqual } from "types/boolean-logic/operators/scalar/numeric/IsLessThan";

type Generic<A extends NumberLike, B extends NumberLike> = IsLessThan<A, B>;
type GenericOrEqual<A extends NumberLike, B extends NumberLike> = IsLessThanOrEqual<A, B>;
type Probe = [Generic<9999, 10000>, Generic<"5", "10">, GenericOrEqual<100, 100>];
