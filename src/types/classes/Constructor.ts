/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Define a class constructor; allowing strong typing for constructor's parameters
 * and the returned class structure.
 */
export type Constructor<
  Ctor extends readonly unknown[] = readonly unknown[], 
  Klass = any
> = new (...props: Ctor) => Klass;
