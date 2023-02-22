import { IfEqual, IfLiteral, IsNegativeNumber } from "src/types/boolean-logic";
import {  NumericChar } from "src/types/string-literals";
import { ToString, ToNumber } from "src/types/type-conversion";
import {  DigitalLiteral } from "../base-types";
import { ExcludeLast, Length, ReplaceLast } from "../lists";
import { Last } from "../lists/Last";
import { Digitize } from "./Digitize";
import { NextDigit } from "./NextDigit";


/**
 * Returns null if there is no overflow,
 * otherwise it returns the index in digits
 * where the overflow completes.
 */
type _Pos<
  TNumber extends readonly NumericChar[]
> = [] extends TNumber
  ? null
  : IfEqual<
  Last<TNumber>, "9", // look for overflow
  _Pos<ExcludeLast<TNumber> & readonly NumericChar[]>,
  Length<TNumber>
>;

type _Neg<
  TNumber extends readonly NumericChar[]
> = 0;

type _Update<
  TNumber extends readonly NumericChar[],
  TIndex extends null | (keyof TNumber & number)
> = TIndex extends null
  ? ReplaceLast<TNumber, NextDigit<Last<TNumber> & NumericChar>>
  : any;


type _Inc<
  TNumber extends DigitalLiteral
> = IsNegativeNumber<TNumber> extends true 
  ? _Neg<TNumber[1]>
  : _Update<TNumber[1], _Pos<TNumber[1]>>;

/**
 * **Increment**`<T>`
 * 
 * Increments the value of a numeric literal by one. 
 * 
 * - Note: can also receive a string literal which extends `${number}`
 */
export type Increment<T extends number | `${number}`> = IfLiteral<
  T,
  T extends number
    ? ToString<T> extends `${number}`
      ? ToNumber<Increment<ToString<T>>>
      : never 
    : T extends `${number}`
      ? _Inc<Digitize<T>>
      : never
  ,
  never
>;


/**
 * **Inc**`<T>`
 * 
 * Type alias for `Increment<T>` which increments a numeric literal by one.
 */
export type Inc<T extends number | `${number}`> = Increment<T>;
