/**
 * **NarrowingFn**`<TParams, TReturn>`
 * 
 * Very similar to `BaseFunction` but where the base function's provide narrowing
 * characteristics.
 */
export type NarrowingFn<
  TParams extends readonly unknown[] = unknown[], 
  TReturn = unknown
> = <AA extends TParams>(...args: AA) => TReturn;
