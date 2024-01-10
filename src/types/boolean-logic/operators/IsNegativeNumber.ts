import { Digital, DigitalLiteral , IfLiteral, IfStartsWith , ToString } from "src/types";

/**
 * **IsNegativeNumber**`<T>`
 * 
 * Returns a literal true/false where possible to whether `T` is a _negative_
 * number. Will return `boolean` type if unable to resolve at design time.
 */
export type IsNegativeNumber<T> = T extends `${number}` | number
? IfLiteral<
  T,
  IfStartsWith<ToString<T>, "-", true, false>,
  boolean
>
: T extends Digital
  ? T[0] extends "-" ? true : false
  : T extends DigitalLiteral
    ? T[0] extends "-" ? true : false
    : never;
