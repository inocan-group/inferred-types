import {  
  And,
  Container, 
  Contains, 
  ExplicitlyEmptyObject, 
  If, 
  IsEqual, 
  IsObjectLiteral, 
  IsTuple, 
  KV, 
  Keys, 
  Not, 
  Tuple, 
} from "src/types/index";

/**
 * **IsValidIndex**`<TContainer,TKey>`
 * 
 * Provides a boolean check on whether `TKey` is a valid key for `TContainer`.
 * 
 * - valid responses are `true` or `false` if literal types found; otherwise `boolean`
 */
export type IsValidIndex<
  TContainer extends Container,
  TKey extends PropertyKey
> = TContainer extends Tuple
? If<
    IsTuple<TContainer>,
    Contains<Keys<TContainer>, TKey>,
    boolean
  >
: TContainer extends KV
  ? If<
      IsEqual<TContainer, ExplicitlyEmptyObject>,
      false,
      If<
        And<[
          IsObjectLiteral<TContainer>, Not<IsEqual<TContainer,KV>>
        ]>,
        TKey extends number
          ? false
          : Contains<Keys<TContainer>, TKey>,
        boolean
      >
    >
  : false;


