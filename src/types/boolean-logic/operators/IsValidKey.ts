import { AnyObject, Container, IfContains, IfLiteral,  Keys, Tuple } from "src/types/index";


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
> = IfLiteral<
  TContainer,
  IfContains<Keys<TContainer>, TKey, true, false>,
  TContainer extends Tuple
    ? TKey extends number
      ? boolean
      : false
    : TContainer extends AnyObject
      ? TKey extends number
        ? false
        : boolean
    : never
>;
