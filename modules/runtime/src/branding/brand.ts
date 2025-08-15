import type { Scalar } from "@inferred-types/types";
import type { Brand } from "inferred-types/types";

export function brand<
    T extends Scalar,
    A extends string
>(
    val: T,
    name: A
): Brand<T, A> {
    return val as Brand<T, A>;
}
