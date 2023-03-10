import { Narrowable, ToNumber } from "src/types";
import { ifArray, ifBoolean, ifLength, ifNumber, ifString, ifTrue, never } from "src/runtime";

const conversion = <T extends Narrowable>(val: T) =>
  ifNumber(
    val,
    (num) => num, // identity
    () => ifString(
      val, 
      (str) => Number(str),
      el => ifBoolean(
        el,
        <V extends boolean>(bool: V) => ifTrue(bool, () => 1, () => 0),
        () => never(NaN)
      )
    )
  ) as unknown as ToNumber<T>;

/**
 * **toNumber**(value)
 * 
 * Runtime utility which converts a value into a _numeric_ variant:
 * 
 * - for scalars (and objects) it will try to convert to number but otherwise returns `NaN` to runtime and `never` to type system
 * - for arrays it will iterate over each element and try to convert to a number like above
 */
export function toNumber<
  T extends Narrowable
>(value: T) {
  return ifArray(
    value,
    v => ifLength(
      v, 0, 
      () => [] as readonly number[], 
      tuple => tuple.map(i => conversion(i as Narrowable))
    ) as unknown as ToNumber<T>,
    () => conversion(value)
  ); 
}
