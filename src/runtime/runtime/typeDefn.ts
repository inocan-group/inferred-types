export const typeDefn = {
  string: () => "string",
  number: () => "number" as unknown as number,
  boolean: () => "boolean" as unknown as boolean,
  true: (): true => true,
  false: (): false => false,
  literal: <T extends unknown[]>(...literals: T) => literals
} as const;

export type TypeDefn = typeof typeDefn;
