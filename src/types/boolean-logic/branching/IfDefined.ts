import { IfNever, IfUndefined } from "src/types/index";

/**
 * **IfDefined**`<T>`
 * 
 * Conditional utility which branches based on whether `T` is
 * considered "defined" where defined is:
 * 
 * - any value which is NOT `never` or `undefined`
 */
export type IfDefined<
  T,
  IF,
  ELSE
> = IfNever<
  T,
  ELSE, // never is considered "undefined"
  IfUndefined<
    T,
    ELSE,
    IF
  >
>;
