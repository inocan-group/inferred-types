import type {
    FromInputToken,
    InputTokenLike,
} from "inferred-types/types";
import { Never } from "inferred-types/constants";
import {
    defineObject,
    err,
    isDefineObject,
    isString
} from "inferred-types/runtime";

type AsType<T extends readonly InputTokenLike[]> = T extends [InputTokenLike]
    ? FromInputToken<T[0]>
    : T extends readonly InputTokenLike[]
        ? {
            [K in keyof T]: FromInputToken<T[K]>
        }
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
                        `Call to asType() passed in a singular type value but it was neither an object or string definition! If you wanted to create a tuple type then pass in the items in the tuple inline.`
                    )
            : token.length > 1
                ? "TUPLE"
                : Never
    ) as unknown as AsType<T>;
}
