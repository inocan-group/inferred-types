import { IsNegativeNumber , ToNumber, ToString } from "..";

/**
 * **Negative**`<T>`
 * 
 * Ensures that the number represented by `T` is a _negative_ number.
 */
export type Negative<T extends number | `${number}`> = T extends `${number}`
  ? ToString<Negative<ToNumber<T>>>
  : IsNegativeNumber<T> extends true
    ? T
    : ToNumber<ToString<`-${T}`>>;
