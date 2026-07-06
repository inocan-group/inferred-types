import type { NumberLike } from "types/numeric-literals/NumberLike";
import type { Subtract } from "types/numeric-literals/Subtract";

type Generic<A extends NumberLike, B extends NumberLike> = Subtract<A, B>;
type Probe = [Generic<10, 5>, Generic<"5", "10">, Generic<number, 2>];
