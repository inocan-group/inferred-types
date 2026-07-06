import type { Add } from "types/numeric-literals/Add";
import type { NumberLike } from "types/numeric-literals/NumberLike";

type Generic<A extends NumberLike, B extends NumberLike> = Add<A, B>;
type Probe = [Generic<1, 2>, Generic<"40", "60">, Generic<number, 1>];
