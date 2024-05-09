import {  
  AllLiteral,
  AllNumericLiterals, 
  AllStringLiterals, 
  Container, 
  Contains, 
  If,  
  KV,  
  Keys, 
  ObjectKey, 
  Or, 
  Tuple 
} from "src/types/index";


type WideGenerics<
  TContainer extends Container,
  TKey extends PropertyKey
> = TContainer extends Tuple
? TKey extends number
  ? boolean
  : false
: TContainer extends object | KV
  ? TKey extends ObjectKey
    ? false
    : boolean
: never;

/**
 * **IsValidKey**`<TContainer,TKey>`
 * 
 * Provides a boolean check on whether `TKey` is a valid key for `TContainer`.
 * 
 * - valid responses are `true` or `false` if literal types found; otherwise `boolean`
 */
export type IsValidKey<
  TContainer extends Container,
  TKey extends PropertyKey
> = If<
  AllLiteral<[TContainer]>,
  If<
    Or<[AllStringLiterals<Keys<TContainer>>, AllNumericLiterals<Keys<TContainer>>]>,
    If<
      Contains<Keys<TContainer>, TKey>,
      true,
      false
    >,
    WideGenerics<TContainer, TKey>
  >,
  boolean
>;

