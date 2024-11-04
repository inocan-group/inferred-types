import { Tuple, Length, FixedLengthArray } from "@inferred-types/types";

type Pop<T extends Tuple> = Length<T> extends 0
  ? 0
  : T extends [unknown, ...(infer Rest)]
    ? Length<Rest>
    : never;

/**
 * **Decrement**`<T>`
 *
 * Allows a number -- or a string literal of a number -- to be _decremented_
 * by one.
 *
 * - Once reaching zero the Decrement<T> utility will stay at 0
 */
export type Decrement<T extends number | `${number}`> = T extends number
  ? Pop<FixedLengthArray<unknown, T>>
  : T extends `${infer Num extends number}`
    ? `${Decrement<Num>}`
    : never;
