/**
 * **Fn**`<TArgs,TReturn>`
 */
export type Fn<
  TArgs extends readonly unknown[] = [], 
  TReturn = unknown
> = <A extends Readonly<TArgs>>(...args: A) => TReturn;

