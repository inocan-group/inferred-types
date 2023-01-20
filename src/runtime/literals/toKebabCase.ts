import { KebabCase } from "src/types/string-literals/KebabCase";

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
>(input: S, _preserveWhitespace?: P) {
  const [_, preWhite, focus, postWhite] = /^(\s*)(.*?)(\s*)$/.exec(input) as RegExpExecArray;

  const replaceWhitespace = (i: string) => i.replace(/\s/gs, "-");
  const replaceUppercase = (i: string) => i.replace(/[A-Z]/g, (c) => `-${c[0].toLowerCase()}`);
  const replaceLeadingDash = (i: string) => i.replace(/^-/s, "");
  const replaceTrailingDash = (i: string) => i.replace(/-$/s, "");
  const replaceUnderscore = (i: string) => i.replace(/_/g, "-");
  const removeDupDashes = (i: string) => i.replace(/-+/g, "-");

  return `${preWhite}${replaceUnderscore(
    replaceTrailingDash(
      replaceLeadingDash(removeDupDashes(replaceWhitespace(replaceUppercase(focus))))
    )
  )}${postWhite}` as KebabCase<S,P>;
}
