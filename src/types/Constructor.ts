/**
 * Define a class constructor; allowing strong typing for constructor's parameters
 * and the returned class structure.
 */
export type Constructor<
  Ctor extends unknown[], 
  Klass
> = new (...props: Ctor) => Klass;
