import { If, IfNever, IsStringLiteral, SingularNoun } from "inferred-types/dist/types/index";


/**
 * **IsSingularNoun**`<T>`
 *
 * Boolean operator which returns:
 *
 * - `true` - if `T` is a string literal with only `Alpha` chars and ending in
 * character defined by `SingularNounEnding`.
 * - `boolean` - if `T` is a wide string type
 * - `false` - all other conditions
 */
export type IsSingularNoun<T> = T extends string
  ? If<
      IsStringLiteral<T>,
      IfNever<SingularNoun<T>, false, true>,
      boolean
    >
  : false;
