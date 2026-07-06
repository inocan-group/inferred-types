import type { NumberLike } from "types/numeric-literals/NumberLike";
import type { Sum } from "types/numeric-literals/Sum";

type Generic<T extends readonly NumberLike[]> = Sum<T>;
type Probe = [Generic<[1, 2, 3]>, Generic<[1000, 2000, 3000]>, Generic<NumberLike[]>];
