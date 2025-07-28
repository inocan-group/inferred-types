/**
 * **HasIndexSignature**`<T>`
 *
 * Tests whether a container `T` has an _index signature_ as part of
 * it's type definition.
 */
export type HasIndexSignature<T> =
  string extends keyof T ? true :
  number extends keyof T ? true :
  symbol extends keyof T ? true : false;
