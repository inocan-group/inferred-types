import {  
  Abs,
  AsNumber,
  Container, 
  ExplicitlyEmptyObject, 
  If, 
  IsEqual, 
  IsNegativeNumber, 
  IsStringLiteral,
  IsObjectLiteral, 
  IsTuple, 
  KV, 
  Tuple,
  NumericKeys,
  TupleToUnion, 
} from "src/types/index";


/**
 * **IsValidIndex**`<TContainer,TKey>`
 * 
 * Provides a boolean check on whether `TKey` is a valid key for `TContainer`.
 * 
 * - valid responses are `true` or `false` if literal types found; otherwise `boolean`
 * - negative indexes are allowed when `TContainer` is a tuple
 */
export type IsValidIndex<
  TContainer extends Container,
  TKey extends PropertyKey
> = TContainer extends Tuple
? If<
    IsTuple<TContainer>,
    TKey extends number
    ? If<
      IsNegativeNumber<AsNumber<TKey>>,
      Abs<AsNumber<TKey>> extends number
        ? [Abs<AsNumber<TKey>>] extends [TupleToUnion<NumericKeys<TContainer>>]
          ? true
          : false
        : never,
      [TKey] extends [TupleToUnion<NumericKeys<TContainer>>]
        ? true
        : false
    >
    : false,
    boolean
  >
: TContainer extends KV
  ? If<
      IsEqual<TContainer, ExplicitlyEmptyObject>,
      false,
      [IsObjectLiteral<TContainer>] extends [true]
      ? [IsStringLiteral<TKey>] extends [true]
        ? [TKey] extends [keyof TContainer]
          ? true
          : false
        : [TKey] extends [symbol]
          ? [TKey] extends [keyof TContainer]
            ? true
            : false
          : false
      : boolean
    >

: false;


