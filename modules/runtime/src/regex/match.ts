import type { EachAsStringLiteralTemplate } from "inferred-types/types";

export type MatchTemplate<
    T extends readonly string[],
    M extends <TInput extends string>(input: TInput) => unknown[] = <TInput extends string>(input: TInput) => unknown[]
> = {
    kind: "MatchTemplate";
    template: T;
    re: RegExp;
    match: M;
};

/**
 * **createMatchTemplate**`(defn)`
 *
 * A _match template_'s definitoin is typically provided as a dictionary:
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
export function createMatchTemplate<T extends readonly string[]>(
    ...template: T
) {
    return {
        kind: "MatchTemplate",
        /** The _type pattern_ which will be matched for at runtime */
        template: template as unknown as EachAsStringLiteralTemplate<T>,

        match(input) {

        }
    } as MatchTemplate<EachAsStringLiteralTemplate<T>>;
}

export function match<
    TFind,
    TIn extends readonly string[]
>(
    find: TFind,
    ...from: TIn
) {

}
