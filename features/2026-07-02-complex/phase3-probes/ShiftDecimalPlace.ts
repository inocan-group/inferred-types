import type { NumberLike } from "types/numeric-literals/NumberLike";
import type { ShiftDecimalPlace } from "types/numeric-literals/ShiftDecimalPlace";

type Generic<T extends NumberLike, U extends number> = ShiftDecimalPlace<T, U>;
type Probe = [Generic<123, 2>, Generic<"1", -1>, Generic<number, 2>];
