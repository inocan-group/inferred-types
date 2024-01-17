import { IfEqual, ToNumber } from "src/types/index";

/**
 * **Float**`<TVal>`
 * 
 * Returns the decimal portion of a number.
 */
export type Float<TVal extends number | `${number}`> = 
TVal extends number
  ? ToNumber<Float<`${TVal}`>>
  : TVal extends `${number}.${infer F}`
    ? IfEqual<F, "", "0", F>
    : "0";
