import type { KebabCase } from "inferred-types/types";

/**
 * **toKebabCase**(str)
 *
 * Converts a string into `kebab-case` while preserving literal strings.
 *
 * **Note:** _by default it also removes surrounding white space (if it exists) but it
 * can be preserved if you change the `preserveWhitespace` flag._
 *
 * **Related:** `toPascalCase`, `toCamelCase`, `toSnakeCase`
 */
export function toKebabCase<
    S extends string | undefined,
    P extends boolean = false,
>(input: S, _preserveWhitespace: P = false as P) {
    // eslint-disable-next-line regexp/no-super-linear-backtracking
    const [_, preWhite, focus, postWhite] = /^(\s*)([\s\S]*?)(\s*)$/.exec(input || "") as RegExpExecArray;

    const replaceWhitespace = (i: string) => i.replace(/\s/g, "-");
    const replaceUppercase = (i: string) => i.replace(/[A-Z]/g, c => `-${c[0].toLowerCase()}`);
    const replaceLeadingDash = (i: string) => i.replace(/^-/, "");
    const replaceTrailingDash = (i: string) => i.replace(/-$/, "");
    const replaceUnderscore = (i: string) => i.replace(/_/g, "-");
    const removeDupDashes = (i: string) => i.replace(/-+/g, "-");

    return removeDupDashes(`${preWhite}${replaceUnderscore(
        replaceTrailingDash(
            replaceLeadingDash(removeDupDashes(replaceWhitespace(replaceUppercase(focus)))),
        ),
    )}${postWhite}`) as unknown as S extends string ? KebabCase<S, P> : undefined;
}
