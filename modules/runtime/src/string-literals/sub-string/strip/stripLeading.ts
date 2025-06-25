import type { StripLeading, TupleToUnion } from "inferred-types/types";
import { isNumber, isUndefined } from "runtime/type-guards";

type Returns<
    T extends string | number | undefined,
    U extends readonly (string | number)[],
> = T extends undefined
    ? undefined
    : T extends string | number
        ? StripLeading<T, TupleToUnion<U>>
        : never;

/**
 * **stripLeading**(content, ...strip)
 *
 * Runtime utility which strips of a leading substring from the
 * primary content if it exists and leaves content unchanged otherwise.
 */
export function stripLeading<
    T extends string | number | undefined,
    U extends readonly (string | number)[],
>(
    content: T,
    ...strip: U
) {
    if (isUndefined(content)) {
        return undefined as Returns<T, U>;
    }
    let output: string = String(content);

    for (const s of strip) {
        if (output.startsWith(String(s))) {
            output = output.slice(String(s).length);
        }
    }

    return (
        isNumber(content) ? Number(output) : output
    ) as unknown as Returns<T, U>;
}
