/**
 * **t**()
 * 
 * A very quick way to produce a "type" at runtime.
 * 
 * Note: use `type()` instead to create a runtime verifiable type
 */
export const t = {
  string: (v?: string) => (v || "") as string,
  stringLiteralUnion: <T extends readonly string[]>(...literals: T) => literals as T,
  number: () => 0 as number,
  numericString: () => "0" as `${number}`,
  numericLiteralUnion: <T extends readonly number[]>(...literals: T) => literals as T,
  boolean: () => true as boolean,
  booleanString: () => "booleanString" as `${true | false}`,
  true: () => true as true,
  false: () => false as false,
  never: () => undefined as never,
  symbol: (text: string) => Symbol(text) as symbol,
  undefined: () => undefined,
  null: () => null,
  literal: <T>() => null as T,
};
