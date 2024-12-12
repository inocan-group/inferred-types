import type { CssDefinition } from "inferred-types/types";
import { createFnWithProps, ensureTrailing } from "inferred-types/runtime";

function createCss<T extends CssDefinition>(defn: T, indent = "") {
  return Object.keys(defn)
    .map(key => `${indent}${key}: ${ensureTrailing(defn[key as keyof typeof defn] as string, ";")}\n`)
    .join("");
}

export function defineCss<T extends CssDefinition>(defn: T) {
  const fn = <S extends string>(selector?: S) => {
    return selector
      ? `${selector} {\n${createCss(defn, "  ")}}\n`
      : createCss(defn);
  };
  return createFnWithProps(
    fn,
    { defn },
  ) as { defn: T } & (<S extends string>(selector?: S) => string);
}
