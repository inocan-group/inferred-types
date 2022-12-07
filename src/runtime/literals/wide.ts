/**
 * **wide**
 *
 * Provides a dictionary of _wide_ types
 */
export const wide = {
  boolean: false as boolean,
  string: "" as string,
  number: 0 as number,
  symbol: Symbol() as Symbol,
  null: null,
  undefined: undefined,
} as const;
