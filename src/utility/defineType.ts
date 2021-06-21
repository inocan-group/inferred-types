import { ExpandRecursively, Narrowable } from "~/types";

/**
 * Build a _type_ from two run-time dictionaries.
 * 
 * 1. The _first_ -- which is optional -- is interpreted as a _literal_ type definition
 * 2. The _second_ dictionary is interpreted as a "wide" definition of prop types
 */
export function defineType<
  N extends Narrowable,
  TLiteral extends Record<string, N>
>(literal?: TLiteral) {
  /**
   * Add any key/value pairs which you want to have _wide_ types associated;
   * literal types are defined already and stated above.
   */
  return <TWide extends object>(wide?: TWide) => {
    return (literal ? { ...wide, ...literal } : wide) as TLiteral extends object
      ? TWide extends object ? ExpandRecursively<TWide & TLiteral> : TLiteral
      : TWide extends object ? TWide : {};
  };
}
