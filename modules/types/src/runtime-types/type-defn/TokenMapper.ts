
/**
 * **TokenMapper**
 *
 * A simple key value store where:
 *
 * - the _keys_ must be strings and they represent the "tokens" your
 * token mapping solution (with the use of `DefineObjectWith`)
 * - the _values_ are the _types_ which the **key** represents
 *
 * This is meant to be used with `DefineObjectWith<T>` type utility.
 */
export type TokenMapper = Record<string, unknown>;
