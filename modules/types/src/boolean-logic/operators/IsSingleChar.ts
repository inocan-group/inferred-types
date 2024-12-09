import type {
  If,
  IsStringLiteral,
  Length,
} from "inferred-types/types";

/**
 * **IsSingleChar**`<T>`
 *
 * Boolean operator which returns true/false/boolean based on whether `T` is a
 */
export type IsSingleChar<T> = T extends string
  ? Length<T> extends 1
    ? true
    : If<
      IsStringLiteral<T>,
      false,
      boolean
    >
  : false;
