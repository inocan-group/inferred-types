import type { CompareNumbers } from "types/numeric-literals/CompareNumbers";
import type { NumberLike } from "types/numeric-literals/NumberLike";

type Generic<A extends NumberLike, B extends NumberLike> = CompareNumbers<A, B>;
type Probe = [Generic<10000, 9999>, Generic<-2.5, -1.5>, Generic<"5", "10">];
