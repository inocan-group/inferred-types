import { Never } from "inferred-types/constants";
import type {
    Err,
    FromInputToken,
    InputTokenLike,
    IsGreaterThan
} from "inferred-types/types";
import { defineObject } from "src/dictionary";
import { err } from "src/errors";
import { isDefineObject, isString } from "src/type-guards";

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
 * Receives an `InputTokenLike` token and converts the type to the
 * type this token references while ensuring that the runtime type
 * is the string representation of the token.
 *
 * **Related:** `fromInputToken()`
 */
export function asType<
    T extends readonly InputTokenLike[]
>(...token: T) {
    return (
        token.length === 1
        ? isDefineObject(token[0])
            ? defineObject(token[0])
            : isString(token[0])
                ? token[0].trim()
                : err(
                    `invalid-token/structure`,
                    `Call to asType() passed in a singular type value but it was neither an object or string definition! If you wanted to create a tuple type then pass in the items in the tuple inline.`)
        : token.length > 1
        ? "foo"
        : Never
    ) as unknown as AsType<T>;
}
