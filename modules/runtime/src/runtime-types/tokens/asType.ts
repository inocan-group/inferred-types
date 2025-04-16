import { Never } from "inferred-types/constants";
import type {
    Err,
    First,
    FromInputToken,
    InputTokenLike,
    IsGreaterThan
} from "inferred-types/types";

type AsType<T extends readonly InputTokenLike[]> = T extends [InputTokenLike]
    ? FromInputToken<T[0]>
    : T["length"] extends 0
    ? Err<"invalid-token/missing","no tokens were passed into asType() function!">
    : IsGreaterThan<T["length"], 1> extends true
        ? T extends readonly InputTokenLike[]
            ? FromInputToken<T>
            : never
    : never;


/**
 * Receives an `InputToken` and converts the type to the
 * type this token references.
 *
 * **Related:** `fromInputToken()`
 */
export function asType<
    T extends readonly InputTokenLike[]
>(...token: T) {
    return (
        token.length === 1
        ? String(token[0]).trim()
        : token.length > 1
        ? "foo"
        : Never
    ) as unknown as AsType<T>;
}
