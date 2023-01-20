import { CamelCase } from "src/types/string-literals/CamelCase";
import { toPascalCase } from "./toPascalCase";

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
  TPreserve extends boolean | undefined = undefined
>(input: TString, preserveWhitespace?: TPreserve): CamelCase<TString,TPreserve> {
  const pascal = preserveWhitespace ? toPascalCase(input, preserveWhitespace) : toPascalCase(input);
  const [_, preWhite, focus, postWhite] = /^(\s*)(.*?)(\s*)$/.exec(
    pascal
  ) as RegExpExecArray;

  const camel = (preserveWhitespace ? preWhite : "") +
    focus.replace(/^.*?([0-9]*?[a-z|A-Z]{1})/s, (_, p1) => p1.toLowerCase()) +
    (preserveWhitespace ? postWhite : "") as CamelCase<TString,TPreserve>;

  return camel ;
}
