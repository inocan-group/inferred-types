export const runtimeType = {
  string: () => "string",
  numericString: () => "numeric-string" as `${number}`,
  booleanString: () => "boolean-string" as `${boolean}`,
  number: () => "number" as unknown as number,
  boolean: () => "boolean" as unknown as boolean,
  true: (): true => true,
  false: (): false => false,
  literal: <T extends unknown[]>(...literals: T) => literals,
  explicitType: <T>() => "explicitType" as T
} as const;

export type RuntimeType = typeof runtimeType;
