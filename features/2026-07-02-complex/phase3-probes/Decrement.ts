import type { Decrement } from "types/numeric-literals/Decrement";

type Generic<T extends number | `${number}`> = Decrement<T>;
type Probe = [Generic<30>, Generic<"10">, Generic<number>];
