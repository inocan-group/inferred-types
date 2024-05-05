import { Container, Split, First, AfterFirst, IfOr, IsWideType, IsRef, AsRef } from "src/types/index";

type Process<
  TContainer extends Container,
  TIndexes extends readonly string[]
> = [] extends TIndexes
? true
: First<TIndexes> extends keyof TContainer
  ? TContainer[First<TIndexes>] extends Container
    ? Process<
        TContainer[First<TIndexes>],
        AfterFirst<TIndexes>
      >
    : AfterFirst<TIndexes>["length"] extends 0
      ? true
      : false
  : IsRef<TContainer> extends true
    ? First<TIndexes> extends keyof AsRef<TContainer>["value"]
      ? TIndexes["length"] extends 1
        ? true
        : AsRef<TContainer>["value"][First<TIndexes>] extends Container
          ? Process<
              AsRef<TContainer>["value"][First<TIndexes>],
              AfterFirst<TIndexes>
            >
          : false
      : false
    : false;


/**
 * **IsValidDotPath**`<TContainer, TKey>`
 * 
 * Boolean operator which detects whether a given key -- `TKey` -- can index into the
 * container `TContainer`.
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
export type IsValidDotPath<
  TContainer extends Container, 
  TDotKey extends string
> = IfOr<
  [IsWideType<TContainer>,IsWideType<TDotKey>],
  boolean,
  Process<
    TContainer,
    Split<TDotKey,".">
  >
>;
