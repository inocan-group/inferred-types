import type { If, IsNotEqual, Length } from "inferred-types/types";

/**
 * **NotLength**`<T>`
 *
 * Boolean operator which detects whether `T` is _not_ a certain length.
 */
export type NotLength<T extends readonly unknown[], U extends number> = If<
  IsNotEqual<Length<T>, U>,
  true,
  false
>;
