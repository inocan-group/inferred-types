
import { Tuple,  IsReadonlyArray, IsNonEmptyContainer, ToNumber} from "inferred-types/dist/types/index";

type _Convert<
  TInput extends Tuple
> = IsNonEmptyContainer<TInput> extends true
  ? {
    [K in keyof TInput]: ToNumber<TInput[K]>
  }
  : number[];

/**
 * **ToNumericArray**`<TList>`
 *
 * Utility which accepts an array of numeric values _or_ a numeric
 * string literal and ensures that each element is made into a numeric value.
 *
 * - wide `number` types are fine and will be preserved as such
 * - numeric string literals will be converted to a narrow numeric type if
 * possible
 */
export type ToNumericArray<
  TList extends Tuple
> = IsReadonlyArray<TList> extends true
  ? Readonly<_Convert<TList>>
  : _Convert<TList>;

