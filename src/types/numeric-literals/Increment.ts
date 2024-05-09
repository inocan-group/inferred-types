import { 
  Tuple, 
  Length, 
  FixedLengthArray,
  ToString, 
  AsNumber 
} from "src/types/index";

type Push<T extends Tuple> = Length<
  [...T, unknown]
>;

/**
 * **Increment**`<T>`
 * 
 * Allows a number -- or a string literal of a number -- to be _incremented_
 * by one.
 * ```ts
 * // 2
 * type T = Increment<1>;
 * // "2"
 * type T = Increment<"1">;
 * ```
 */
export type Increment<T extends number | `${number}`> = T extends number
  ? Push<FixedLengthArray<unknown, T>>
  : T extends `${number}`
    ? ToString<Increment<AsNumber<T>>>
    : never;
