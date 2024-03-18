import { Narrowable, VueRef } from "src/types/literals";

/**
 * **asVueRef**(value)
 * 
 * Receives a _value_ and makes it look like a `VueRef<T>` which will make
 * it pass the `IsRef<T>` type check. It also provides a hidden `_value` property
 * to the runtime which makes it pass the `isRef()` runtime check.
 * 
 * Note:
 * 
 * - this is a convenience function for building test cases in a library where you're
 * not actually exporting VueJS symbols (like inferred-types).
 */
export const asVueRef = <T extends Narrowable>(value: T) => ({
  value,
  _value: null
}) as unknown as VueRef<T>;
