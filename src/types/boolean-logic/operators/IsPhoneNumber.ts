import { IsNever, PhoneNumber } from "../..";
import { IsStringLiteral } from "./IsStringLiteral";


/**
 * **IsPhoneNumber**`<T>`
 *
 * Boolean operator which tests whether `T` has a
 * type that supports it being a phone number.
 *
 * **Related:** `PhoneNumber`
 */
export type IsPhoneNumber<T> = T extends string
? IsStringLiteral<T> extends true
  ? IsNever<PhoneNumber<T>> extends true
    ? false
    : true
: boolean
: false;

