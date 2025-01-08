import type { CssDefinition } from "inferred-types/types";
import { createFnWithProps, ensureTrailing, isDefined, isString } from "inferred-types/runtime";

export interface CssFromDefnOption {
  indent?: string;
  inline?: boolean;
}

/**
 * **cssFromDefinition**`(defn, [opt])`
 *
 * converts a `CssDefinition` into a CSS string
 */
export function cssFromDefinition<
  T extends CssDefinition,
  O extends CssFromDefnOption,
>(
  defn: T,
  opt?: O,
) {
  const inline = isDefined(opt?.inline) ? opt.inline : true;
  const indent = isString(opt?.indent) ? opt.indent : "";

  const nextDefn = inline ? " " : "\n";
  return Object.keys(defn)
    .map(key => `${indent}${key}: ${ensureTrailing(defn[key as keyof typeof defn] as string, ";")}`)
    .join(nextDefn);
}

export function defineCss<T extends CssDefinition>(defn: T) {
  const fn = <S extends string>(selector?: S) => {
    return selector
      ? `${selector} {\n${cssFromDefinition(defn, { indent: "  " })}}\n`
      : cssFromDefinition(defn);
  };
  return createFnWithProps(
    fn,
    { defn },
  ) as { defn: T } & (<S extends string>(selector?: S) => string);
}
