import { PascalCase , LeftWhitespace, RightWhitespace } from "src/types/index";
import { capitalize } from "src/runtime/index";

/**
 * **toPascalCase**(str)
 * 
 * Converts a string into `PascalCase` while preserving literal strings.
 * 
 * **Note:** _by default it also removes surrounding white space (if it exists) but it
 * can be preserved if you change the `preserveWhitespace` flag._
 * 
 * **Related:** `toKebabCase`, `toCamelCase`, `toSnakeCase`
 */
export function toPascalCase<
  S extends string, 
  P extends boolean | undefined = undefined
>(input: S, preserveWhitespace: P = undefined as P) {
  const [_, preWhite, focus, postWhite] = /^(\s*)(.*?)(\s*)$/.exec(
    input
  ) as RegExpExecArray;

  const convertInteriorToCap = (i: string) =>
    i.replace(/[ |_|-]+([0-9]*?[a-z|A-Z]{1})/gs, (_, p1) => p1.toUpperCase());
  const startingToCap = (i: string) =>
    i.replace(/^[_|-]*?([0-9]*?[a-z]{1})/gs, (_, p1) => p1.toUpperCase());

  const replaceLeadingTrash = (i: string) => i.replace(/^[-_]/s, "");
  const replaceTrailingTrash = (i: string) => i.replace(/[-_]$/s, "");

  const pascal = `${preserveWhitespace ? preWhite : ""}${capitalize(
    replaceTrailingTrash(replaceLeadingTrash(convertInteriorToCap(startingToCap(focus))))
  )}${preserveWhitespace ? postWhite : ""}`;

  return pascal as true extends P
    ? `${LeftWhitespace<S>}${PascalCase<S>}${RightWhitespace<S>}`
    : PascalCase<S>;
}
