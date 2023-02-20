
/**
 * **RegularFn**`<[TArgs], [TReturn]>`
 * 
 * A typical function which receives a set of arguments `TArgs`,
 * and then returns some type `TReturn`.
 */
export type RegularFn<
  TArgs extends readonly any[] = any[],
  TReturn = unknown
> = (...args: TArgs) => TReturn;
