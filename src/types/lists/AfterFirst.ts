/**
 * **AfterFirst**`<T>`
 *
 * returns the elements in an array _after_ the first element
 */
export type AfterFirst<T extends any[] | readonly any[]> = 
  T extends readonly [any, ...any]
  ? T extends readonly [any, ...infer Rest] ? readonly [...Rest] : never
  : T extends any[]
    ? []
    : T extends [any, ...infer Rest]
      ? Rest
      : [];
