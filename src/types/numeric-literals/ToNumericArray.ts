
import { Tuple, IfLength, IfLiteral, Keys, IfEqual, ToNumber} from "src/types";

type _Convert<
  T extends Tuple,
> = IfEqual<
  T, Tuple<string>,
  Tuple<number>,
  IfEqual<
    T, Tuple<boolean>,
    readonly (0|1)[],
    IfEqual<
      T, Tuple<number>,
      T,
      {
        [K in keyof T]: ToNumber<T[K]>
      }
    >
  >
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
> = IfLength<
  Keys<T>, 0,
  readonly number[],
  IfLiteral<
    T,
    Readonly<_Convert<T>>,
    never
  >
>;

