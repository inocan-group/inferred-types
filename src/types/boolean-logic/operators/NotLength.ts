import { IfNotEqual, Length } from "src/types/index";

/**
 * **NotLength**`<T>`
 * 
 * Boolean operator which detects whether `T` is _not_ a certain length.
 */
export type NotLength<T extends readonly unknown[], U extends number> = IfNotEqual<
  Length<T>, U,
  true,
  false
>;
