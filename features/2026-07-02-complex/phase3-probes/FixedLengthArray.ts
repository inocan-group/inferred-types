import type { NumberLike } from "types/numeric-literals/NumberLike";
import type { FixedLengthArray } from "types/tuples/FixedLengthArray";

type Generic<N extends NumberLike> = FixedLengthArray<unknown, N>;
type Probe = [Generic<3>, Generic<"4">, Generic<number>];
