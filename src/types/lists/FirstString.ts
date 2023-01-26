/**
 * returns the first `string` value from an array of values
 */
export type FirstString<T extends readonly any[]> = T extends [
  infer S extends string, 
  ...any[]
] 
? S 
: never;
