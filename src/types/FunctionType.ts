/**
 * **FunctionType**
 *
 * Provides a way to correctly match for regular functions _and_ functions which
 * also have a dictionary hash alongside the root function.
 *
 * - without the generic `T` specified it simply matches correctly on both plain functions as well as functions which also have properties on them (this is consistent to how runtime's `typeof` operator works)
 * - with the generic you can specify the shape of the key/values
 */
export type FunctionType<T extends {} = {}> = {} extends T
  ? Function | (Function & { [key: string]: any })
  : Function | (Function & T);

/**
 * **FnShape**
 *
 * Simple way to express the shape of a function's arguments and return type.
 */
export type FnShape<A extends any[] = any[], R extends any = any> = (...args: A) => R;
