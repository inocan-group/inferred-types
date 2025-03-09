import type {
    FromInputToken,
    InputTokenLike
} from "inferred-types/types";

/**
 *
 *
 * **Related:** `fromInputToken()
 */
export function asType<
    T extends InputTokenLike
>(token: T) {
    return token as unknown as FromInputToken<T>;
}
