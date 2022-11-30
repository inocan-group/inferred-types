/**
 * **AfterFirst**`<T>`
 *
 * returns the elements in an array _after_ the first element
 */
export type AfterFirst<T extends readonly any[]> = T extends readonly [any, ...any[]]
  ? T extends readonly [any, ...infer Rest]
    ? Rest
    : never
  : T;
