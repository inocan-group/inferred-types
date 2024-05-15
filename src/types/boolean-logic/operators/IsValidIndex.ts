import {  
  Abs,
  AsNumber,
  Container, 
  ExplicitlyEmptyObject, 
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
? IsTuple<TContainer> extends true
  ? TKey extends number
    ? IsNegativeNumber<AsNumber<TKey>> extends true
      ? Abs<AsNumber<TKey>> extends number
        ? [Abs<AsNumber<TKey>>] extends [TupleToUnion<NumericKeys<TContainer>>]
          ? true
          : false
        : never
      : [TKey] extends [TupleToUnion<NumericKeys<TContainer>>]
        ? true
        : false
    : false
  : boolean // not a tuple literal

: TContainer extends KV
  ? IsEqual<TContainer, ExplicitlyEmptyObject> extends true
      ? false
      : [IsObjectLiteral<TContainer>] extends [true]
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
: false;


