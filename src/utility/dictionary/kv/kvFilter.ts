import { Narrowable } from "~/types";

export function dictFilter<N extends Narrowable, T extends Record<string, N>>(obj: T) {}
