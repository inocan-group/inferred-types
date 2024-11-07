import { KebabCase } from "inferred-types/dist/types/index";




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
  S extends string,
  P extends boolean = false
>(input: S, preserveWhitespace: P = false as P) {
  const [_, preWhite, focus, postWhite] = /^(\s*)(.*?)(\s*)$/.exec(input) as RegExpExecArray;

  const replaceWhitespace = (i: string) => i.replace(/\s/gs, "-");
  const replaceUppercase = (i: string) => i.replace(/[A-Z]/g, (c) => `-${c[0].toLowerCase()}`);
  const replaceLeadingDash = (i: string) => i.replace(/^-/s, "");
  const replaceTrailingDash = (i: string) => i.replace(/-$/s, "");
  const replaceUnderscore = (i: string) => i.replace(/_/g, "-");
  const removeDupDashes = (i: string) => i.replace(/-+/g, "-");

  return removeDupDashes(`${preWhite}${replaceUnderscore(
    replaceTrailingDash(
      replaceLeadingDash(removeDupDashes(replaceWhitespace(replaceUppercase(focus))))
    )
  )}${postWhite}`) as unknown as KebabCase<S,P>;
}
