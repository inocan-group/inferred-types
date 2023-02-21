import { First, AfterFirst } from "src/types/lists";
import { ToNumber } from "src/types/type-conversion";
import { IfLength } from "../boolean-logic";
import { Keys } from "../dictionary";

type _Convert<
  T extends readonly (number | `${number}`)[],
  TResults extends readonly number[] = []
> = [] extends T
  ? TResults
  : _Convert<
      AfterFirst<T>,
      [...TResults, ToNumber<First<T>>]
    >;


/**
 * **ToNumericArray**`<T>`
 * 
 * Type utility which accepts an array of numeric values _or_ a numeric
 * string literal and ensures that each element is made into a numeric value.
 * 
 * - wide `number` types are fine and will be preserved as such
 * - numeric string literals will be converted to a narrow numeric type if
 * possible
 */
export type ToNumericArray<T extends readonly (number | `${number}`)[]> = IfLength<
  Keys<T>, 0,
  readonly number[],
  Readonly<_Convert<T>>
>;
