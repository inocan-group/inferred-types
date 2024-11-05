import {
  AsString,
  IsEqual,
  IsWideType,
  NumberLike,
} from "inferred-types/dist/types/index";

/**
 * **IsNegativeNumber**`<T>`
 *
 * A boolean utility which returns true when `T` is a numerically
 * negative value. This includes string literal representations of
 * a number.
 */
export type IsNegativeNumber<
  T extends NumberLike
> = IsWideType<T> extends true
? boolean
: IsEqual<T,NumberLike> extends true
? boolean
: AsString<T> extends `-${number}`
  ? true
  : false;
