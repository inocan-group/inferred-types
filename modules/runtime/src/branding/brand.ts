import type { Scalar, Brand } from "inferred-types/types";

export function brand<
    T extends Scalar,
    A extends string
>(
    val: T,
    _name: A
): Brand<T, A> {
    return val as Brand<T, A>;
}
