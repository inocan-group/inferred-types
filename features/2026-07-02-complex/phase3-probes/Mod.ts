import type { Mod } from "types/numeric-literals/Mod";
import type { NumberLike } from "types/numeric-literals/NumberLike";

type Generic<A extends NumberLike, B extends NumberLike> = Mod<A, B>;
type Probe = [Generic<144, 13>, Generic<-10, 3>, Generic<number, 2>];
