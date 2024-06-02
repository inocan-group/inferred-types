

/**
 * **IsEqual**`<X,Y>`
 *
 * Type utility which tests whether two types -- `X` and `Y` -- are exactly the same type
 */
export type IsEqual<
  X,
  Y,
  TRUE = true,
  FALSE = false
> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? TRUE
  : FALSE;

/**
 * **Equals**`<X,Y>`
 *
 * Type utility which tests whether two types -- `X` and `Y` -- are exactly the same type
 */
export type Equals<X,Y,TTrue = true,TFalse = false> = IsEqual<X,Y,TTrue,TFalse>;

