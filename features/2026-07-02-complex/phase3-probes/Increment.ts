import type { Increment } from "types/numeric-literals/Increment";

type Generic<T extends number | `${number}`> = Increment<T>;
type Probe = [Generic<30>, Generic<"10">, Generic<number>];
