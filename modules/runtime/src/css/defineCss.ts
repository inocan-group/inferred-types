import type { CssDefinition } from "inferred-types/types";
import { createFnWithProps, ensureTrailing } from "inferred-types/runtime";

/**
 * **cssFromDefinition**`(defn, [indent], [inline])`
 *
 * converts a `CssDefinition` into a CSS string
 */
export function cssFromDefinition<
  T extends CssDefinition,
>(defn: T, indent = "", inline: boolean = false) {
  const nextDefn = inline ? " " : "\n";
  return Object.keys(defn)
    .map(key => `${indent}${key}: ${ensureTrailing(defn[key as keyof typeof defn] as string, ";")}${nextDefn}`)
    .join("");
}

export function defineCss<T extends CssDefinition>(defn: T) {
  const fn = <S extends string>(selector?: S) => {
    return selector
      ? `${selector} {\n${cssFromDefinition(defn, "  ")}}\n`
      : cssFromDefinition(defn);
  };
  return createFnWithProps(
    fn,
    { defn },
  ) as { defn: T } & (<S extends string>(selector?: S) => string);
}
