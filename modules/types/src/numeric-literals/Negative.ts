import { AsNumber, AsString, IsNegativeNumber } from "inferred-types/types";

/**
 * **Negative**`<T>`
 *
 * Ensures that the number represented by `T` is a _negative_ number.
 */
export type Negative<T extends number | `${number}`> = T extends `${number}`
  ? AsString<Negative<AsNumber<T>>>
  : IsNegativeNumber<T> extends true
    ? T
    : AsNumber<AsString<`-${T}`>>;
