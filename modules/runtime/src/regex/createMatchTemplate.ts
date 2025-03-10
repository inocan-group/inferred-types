import type { As, ObjectValuesAsStringLiteralTemplate, StringLiteralTemplate } from "inferred-types/types";
import { isString } from "inferred-types/runtime";

export type MatchResponse<
    T extends Record<string, string>
> = [
    full: string,
    rest: Record<string, string[]>
];

export type MatchTemplate<
    T extends Record<string, string>,
    M extends <TInput extends string>(input: TInput) => unknown[] = <TInput extends string>(input: TInput) => unknown[]
> = {
    kind: "MatchTemplate";
    template: T;
    test: (input: string) => boolean;
    match: M;
};

export type AsMatchTemplate<
    T extends string | Record<string, string>,
    M extends <TInput extends string>(input: TInput) => unknown[] = <TInput extends string>(input: TInput) => unknown[]
> = T extends string
    ? MatchTemplate<{ values: T }, M>
    : T extends Record<string, string>
        ? MatchTemplate<T, M>
        : never;

/**
 * **createMatchTemplate**`(defn)`
 *
 * A _match template_'s definition is typically provided as a dictionary:
 *
 * - who's **keys** are a "name" for one of the patterns you want to match for
 * - who's **values** are a String Literal Template's; which are:
 *      - a string literal value which is allowed to contain dynamic markers
 *      - a dynamic marker might be `{{string}}` or `{{number}}`, etc.
 * - if you only have one String Literal Template then rather than a dictionary
 * you can just pass it in "as is"
 *
 * Calling this function will expose a `MatchTemplate` API surface.
 */
export function createMatchTemplate<
    T extends string | Record<K, V>,
    K extends string,
    V extends string
>(
    template: T
) {
    return (
        isString(template)
            ? {
                kind: "MatchTemplate",
                /** The _type pattern_ which will be matched for at runtime */
                template: template as unknown as { values: StringLiteralTemplate<As<T, string>> },
                test(input) {
                    return false;
                },

                match(input) {
                    return [``, {}];
                }
            } satisfies AsMatchTemplate<T>
            : {
                kind: "MatchTemplate",
                /** The _type pattern_ which will be matched for at runtime */
                template: template as unknown as ObjectValuesAsStringLiteralTemplate<As<T, Record<K, V>>>,

                test(input) {
                    return false;
                },

                match(input) {
                    return [``, {}];
                }
            } satisfies AsMatchTemplate<T>
    );
}
