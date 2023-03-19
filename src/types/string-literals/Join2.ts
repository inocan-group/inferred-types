type Join<T extends readonly string[], D extends string> = T extends []
  ? ""
  : T extends readonly [string]
  ? `${T[0]}`
  : T extends [infer H extends string, ...infer R extends readonly string[]]
  ? `${H}${D}${Join<R, D>}`
  : never;

declare function join<D extends string>(
  delimiter: D
): <T extends string, U extends readonly T[]>(...parts: U) => Join<U, D>;
