
import { Tuple, ToNumber, IfTrue, HasKeys, IfReadonlyArray} from "..";

type _Convert<T extends Tuple> = 
IfTrue<
  HasKeys<T>,
  // has keys
  {
    [K in keyof T]: ToNumber<T[K]>
  },
  // no keys
  number[]
>;


/**
 * **ToNumericArray**`<TList>`
 * 
 * Type utility which accepts an array of numeric values _or_ a numeric
 * string literal and ensures that each element is made into a numeric value.
 * 
 * - wide `number` types are fine and will be preserved as such
 * - numeric string literals will be converted to a narrow numeric type if
 * possible
 */
export type ToNumericArray<
  TList extends Tuple
> = IfReadonlyArray<
  TList,
  Readonly<_Convert<TList>>,
  _Convert<TList>
>;

