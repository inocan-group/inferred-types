import { AnyFunction } from "src/types/index";

/**
 * **NarrowingFn**`<TParams, TReturn>`
 * 
 * Very similar to `BaseFunction` but where the base function's provide narrowing
 * characteristics.
 */
export type NarrowingFn<
  TParams extends readonly unknown[] = readonly unknown[], 
  TReturn = unknown
> = <AA extends TParams>(...args: AA) => TReturn;

export type AsNarrowingFn<
  TFn extends AnyFunction
> = TFn extends NarrowingFn
? TFn
: <T extends readonly unknown[]>(...args: T & Parameters<TFn>) => ReturnType<TFn>;
