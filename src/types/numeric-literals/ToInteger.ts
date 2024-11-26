import { If, Extends, Increment, ToNumber } from "inferred-types/types";

export type ToIntegerOp = "truncate" | "round";

type Truncate<T extends `${number}`> =
T extends `${number}.${number}`
  ? T extends `${infer Q}.${number}`
    ? Q & `${number}`
    : never
  : T;

type Round<T extends `${number}`> = T extends `${number}.${number}`
  ? T extends `${infer Q}.${infer D}${number}`
    ? If<
        Extends<D, "0" | "1" | "2" | "3" | "4">,
        Q & `${number}`,
        Increment<Q & `${number}`>
      >
    : never
  : T;

type EnsureKind<
  TKind extends number | `${number}`,
  TVal extends `${number}`
> = TKind extends number
  ? ToNumber<TVal>
  : TVal;

/**
 * **ToInteger**`<T>`
 *
 * Type utility which converts a _number_ (or numeric string
 * literal) to an _integer_ value.
 *
 * - the optional `TOp` generic provides methods for converting
 * a float to integer but the default is just to remove the
 * decimal value from the number (aka, "truncate").
 */
export type ToInteger<
  TVal extends number | `${number}`,
  TOp extends ToIntegerOp = "truncate"
> = TOp extends "truncate"
  ? EnsureKind<TVal, Truncate<`${TVal}` & `${number}`>>
  : EnsureKind<TVal, Round<`${TVal}` & `${number}`>>;

