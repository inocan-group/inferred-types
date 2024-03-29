import type { Length , IfEqual } from "src/types/index";

/**
 * **IsLength**`<T, LEN>`
 * 
 * Boolean type utility which returns true/false based on whether
 * the correct length for `T` is specified.
 */
export type IsLength<
  T,
  LEN extends number
> = T extends readonly unknown[]
  ? IfEqual<Length<T>, LEN, true, false>
  : false;
