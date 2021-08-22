/**
 * Defines a function type.
 *
 * - without the generic `T` specified it simply matches correctly on both plain functions as well as functions which also have properties on them (this is consistent to how runtime's `typeof` operator works)
 * - with the generic you can specify the shape of the key/values
 */
export type FunctionType<T extends {} = {}> = {} extends T
  ? Function | (Function & { [key: string]: any })
  : Function | (Function & T);
