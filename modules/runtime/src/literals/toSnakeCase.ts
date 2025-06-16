import type { SnakeCase } from "inferred-types/types";

/**
 * **toSnakeCase**(str)
 *
 * Converts a string into `snake_case` while preserving literal strings.
 *
 * **Note:** _by default it also removes surrounding white space (if it exists) but it
 * can be preserved if you change the `preserveWhitespace` flag._
 *
 * **Related:** `toKebabCase`, `toCamelCase`, `toPascalCase`
 */
export function toSnakeCase<
    S extends string,
    P extends boolean = false,
>(input: S, preserveWhitespace: P = false as P): SnakeCase<S, P> {
    // eslint-disable-next-line regexp/no-super-linear-backtracking
    const [_, preWhite, focus, postWhite] = /^(\s*)([\s\S]*?)(\s*)$/.exec(input) as RegExpExecArray;

    const convertInteriorSpace = (input: string) => input.replace(/\s+/g, "_");
    const convertDashes = (input: string) => input.replace(/-/g, "_");
    const injectUnderscoreBeforeCaps = (input: string) => input.replace(/([A-Z])/g, "_$1");
    const removeLeadingUnderscore = (input: string) =>
        input.startsWith("_") ? input.slice(1) : input;

    return (
        (preserveWhitespace ? preWhite : "")
        + removeLeadingUnderscore(
            injectUnderscoreBeforeCaps(convertDashes(convertInteriorSpace(focus))),
        ).toLowerCase()
        + (preserveWhitespace ? postWhite : "")
    ).replace(/__/g, "_") as unknown as SnakeCase<S, P>;
}
