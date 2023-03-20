
import { Tuple, ToNumber, IfTrue, HasKeys, IfReadonlyArray} from "src/types";

type _Convert<T extends Tuple> = 
IfTrue<
  HasKeys<T>,
  // has keys
  {
    [K in keyof T]: T[K] extends (`${number}` | number)
    ? ToNumber<T[K]>
    : never
  },
  // no keys
  number[]
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
export type ToNumericArray<
  T extends Tuple
> = IfReadonlyArray<
  T,
  Readonly<_Convert<T>>,
  _Convert<T>
>;

