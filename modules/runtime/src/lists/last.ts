import type { Last, Tuple } from "inferred-types/types";

export function last<T extends Tuple>(list: T): Last<T> {
    return [...list].pop() as Last<T>;
}
