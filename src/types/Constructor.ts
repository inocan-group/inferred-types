/**
 * Define a class constructor; allowing strong typing for constructor's parameters
 * and the returned class structure.
 */
export type Constructor<Ctor extends any[], Klass extends any> = new (...props: Ctor) => Klass;
