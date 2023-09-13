import { Container, DotPathFor, IfNever, IfExtends, IfLiteral, IfStringLiteral } from "../..";

/**
 * **IsValidDotPath**`<TContainer, TKey>`
 * 
 * Boolean operator which detects whether a given key of `TKey` should be considered a
 * valid "dot path" for the container `TContainer`. Results based on `TKey` are:
 * 
 * - `false` 
 *    - any non-string type or any string literal in which `DotPath<T>` resolves
 * to false (including _never_ value).
 * - `boolean`
 *    - when a `TContainer` maps to a wide container type then we have to return boolean
 * as the validity of the key can not be determined at design time
 *    - the same applies to `TKey` being a wide string type
 * - `true` - a string literal value where `DotPath<T>` does not resolve to _never_.
 * 
 * Note: this utility not only validates that `TKey` is a valid key in principle but that it is a valid key for `TContainer`; if you prefer a simpler check then use `IsDotPath<T>` instead.
 */
export type IsValidDotPath<TContainer,TKey> = 
IfNever<
  TKey,
  false,
  IfNever<
    TContainer,
    false,
    TContainer extends Container
      ? TKey extends string
        ? IfLiteral<
            TContainer,
            IfStringLiteral<
              TKey, 
              IfExtends<
                TKey, DotPathFor<TContainer>, 
                true,
                false
                >,
                boolean // TContainer not a literal (but is a container)
              >,
              boolean // TKey not a string literal (but is a string)
            >
          : false
      : false
  >
>;
