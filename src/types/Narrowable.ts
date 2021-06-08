/**
 * A union of types used in conjunction with the `literalValues()` function
 * to produce a _narrow_ type definition of a passed in dictionary object.
 */
export type Narrowable =
  string | number | boolean | symbol | object | undefined | void | null | {};