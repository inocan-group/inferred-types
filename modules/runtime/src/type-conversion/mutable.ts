import type { Mutable, Narrowable } from "inferred-types/types";

export function mutable<T extends Narrowable | readonly Narrowable[]>(value: T): Mutable<T> {
    return value as Mutable<T>;
}
