import { Narrowable } from "~/types";
import { IsBoolean } from "~/utility";

export type IsFalse<T extends Narrowable> = IsBoolean<T> extends true
  ? // is a boolean
    T extends false
    ? true
    : true extends T
    ? false
    : // is of boolean type; therefore narrow type is unknown
      unknown
  : // not a boolean
    false;

export function isFalse<T>(i: T) {
  return (typeof i === "boolean" && !i) as IsFalse<T>;
}
