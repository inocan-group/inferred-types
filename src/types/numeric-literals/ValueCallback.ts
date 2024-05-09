/**
 * **ValueCallback**`<TVal, TReturn>`
 * 
 * A type utility to build a simple "value callback".
 * 
 * ```ts
 * // <V extends string>(v: V) => `hi ${string}`;
 * type T = ValueCallback<string, `hi ${string}`>;
 * ```
 */
export type ValueCallback<
  TVal, 
  TReturn
> = <V extends TVal>(v: V) => TReturn;
