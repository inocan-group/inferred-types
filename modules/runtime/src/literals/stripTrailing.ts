import type { StripTrailing, TupleToUnion } from "inferred-types/types";
import { isNumber, isUndefined } from "inferred-types/runtime";

type Returns<
    T extends string | number | undefined,
    U extends readonly (string | number)[],
> = T extends undefined
    ? undefined
    : T extends string | number
        ? StripTrailing<T, TupleToUnion<U>>
        : never;

/**
 * **stripTrailing**(content, strip)
 *
 * Runtime utility which ensures that last part of a string has substring
 * removed if it exists and that strong typing is preserved.
 */
export function stripTrailing<
    T extends string | number | undefined,
    U extends readonly (string | number)[],
>(
    content: T,
    ...strip: U
): Returns<T, U> {
    if (isUndefined(content)) {
        return undefined as Returns<T, U>;
    }

    let output: string = String(content);

    for (const s of strip) {
        if (output.endsWith(String(s))) {
            output = output.slice(0, -1 * String(s).length);
        }
    }

    return (
        isNumber(content) ? Number(output) : output
    ) as unknown as Returns<T, U>;
}
