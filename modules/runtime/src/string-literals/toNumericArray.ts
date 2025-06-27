import type { ToNumericArray, Tuple } from "inferred-types/types";

export function toNumericArray<T extends Tuple>(arr: T) {
    return arr.map(i => Number(i)) as unknown as ToNumericArray<T>;
}
