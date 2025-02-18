import type { CamelCase } from "inferred-types/types";
import { toPascalCase } from "inferred-types/runtime";

/**
 * **toCamelCase**(str)
 *
 * Converts a string into `camelCase` while preserving literal strings.
 *
 * **Note:** _by default it also removes surrounding white space (if it exists) but it
 * can be preserved if you change the `preserveWhitespace` flag._
 *
 * **Related:** `toKebabCase`, `toPascalCase`, `toSnakeCase`
 */
export function toCamelCase<
  TString extends string,
>(input: TString): CamelCase<TString> {
  const pascal = toPascalCase(input);
  const [_, _preWhite, focus, _postWhite] = /^(\s*)(.*?)(\s*)$/.exec(
    pascal,
  ) as RegExpExecArray;

  const camel = focus.replace(/^.*?(\d*[a-z|])/is, (_, p1) => p1.toLowerCase()) as unknown as CamelCase<TString>;

  return camel;
}
