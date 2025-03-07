import type {
    FromInputToken,
    InputToken
} from "inferred-types/types";

export function asType<
    T extends InputToken
>(token: T) {
    return token as unknown as FromInputToken<T>;
}
