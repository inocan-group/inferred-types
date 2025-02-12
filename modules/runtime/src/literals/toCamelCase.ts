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
  TPreserve extends boolean = false,
>(input: TString, preserveWhitespace?: TPreserve): CamelCase<TString, TPreserve> {
  const pascal = preserveWhitespace ? toPascalCase(input, preserveWhitespace) : toPascalCase(input);
  const [_, preWhite, focus, postWhite] = /^(\s*)(.*?)(\s*)$/.exec(
    pascal,
  ) as RegExpExecArray;

  const camel = (preserveWhitespace ? preWhite : "")
    + focus.replace(/^.*?(\d*[a-z|])/is, (_, p1) => p1.toLowerCase())
    + (preserveWhitespace ? postWhite : "") as unknown as CamelCase<TString, TPreserve>;

  return camel;
}
