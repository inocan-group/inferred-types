/**
 * **Equal**`<X,Y>`
 *
 * Type utility which tests whether two types -- `X` and `Y` -- are exactly the same type
 */
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false;

/**
 * **NotEqual**`<X,Y>`
 *
 * Type utility which tests whether two types -- `X` and `Y` -- are _not_ exactly the same type
 */
export type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;
