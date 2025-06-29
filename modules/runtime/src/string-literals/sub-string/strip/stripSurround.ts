import type {
    StripSurround,
} from "inferred-types/types";
import { isNumber } from "inferred-types/runtime";

export type StripSurroundConfigured<
    TStrip extends readonly (string | number)[],
> = <TInput extends string | number>(input: TInput) => StripSurround<
    TInput,
    TStrip[number]
>;

/**
 * **stripSurround**`(chars) => (input) => _stripped_`
 *
 * A higher order function which allows you to define a string literal
 * stripping function for both the beginning and end of a string literal.
 *
 * ```ts
 * // utility which will strip all starting and ending brackets
 * const stripBrackets = stripSurround("(", ")", "[", "]", "{", "}");
 * // " hello, world "
 * const without = stripBrackets("[ hello, world ]")
 * ```
 *
 * **Related**: `stripSurroundAndTrim`
 */
export function stripSurround<
    TChars extends readonly (number | string)[],
>(...chars: TChars): StripSurroundConfigured<TChars> {
    return <TInput extends string | number>(input: TInput) => {
        let output: string = String(input);

        for (const s of chars) {
            if (output.startsWith(String(s))) {
                output = output.slice(String(s).length);
            }
            if (output.endsWith(String(s))) {
                output = output.slice(0, -1 * String(s).length);
            }
        }

        return (
            isNumber(input) ? Number(output) : output
        ) as unknown as StripSurround<TInput, TChars[number]>;
    };
}
