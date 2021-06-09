import { ExpandRecursively, Narrowable } from "~/types";

/**
 * Build a _type_ from two run-time dictionaries.
 * 
 * 1. The _first_ dictionary is interpreted as a "wide" definition of prop types
 * 2. The _second_ -- which is optional -- is interpreted as a _literal_ type definition
 */
export function inferredType<TWide extends object>(wide: TWide) {
  return <N extends Narrowable, TLiteral extends Record<string, N>>(literal: TLiteral) => {
    return { ...wide, ...literal } as ExpandRecursively<TWide & TLiteral>;
  };
}
