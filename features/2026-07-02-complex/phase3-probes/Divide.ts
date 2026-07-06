import type { Divide } from "types/numeric-literals/Divide";

type Generic<A extends number, B extends number> = Divide<A, B>;
type Probe = [Generic<144, 12>, Generic<-10, 3>, Generic<number, 2>];
