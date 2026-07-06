import type { Multiply } from "types/numeric-literals/Multiply";
import type { NumberLike } from "types/numeric-literals/NumberLike";

type Generic<A extends NumberLike, B extends NumberLike> = Multiply<A, B>;
type Probe = [Generic<12, 5>, Generic<"5", "6">, Generic<number, 2>];
