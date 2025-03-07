import type {
    FromInputToken,
    InputToken,
    UnionArrayToTuple
} from "inferred-types/types";

export function asType<
    T extends InputToken
>(token: T) {
    return token as unknown as FromInputToken<T>;
}
