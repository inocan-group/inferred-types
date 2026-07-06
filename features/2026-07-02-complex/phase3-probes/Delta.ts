import type { Delta, DeltaLight } from "types/numeric-literals/Delta";
import type { NumberLike } from "types/numeric-literals/NumberLike";

type Generic<A extends NumberLike, B extends NumberLike> = Delta<A, B>;
type Light<A extends NumberLike, B extends NumberLike> = DeltaLight<A, B>;
type Probe = [Generic<10, 5>, Generic<"1", -5>, Light<10, 5>];
