import { Narrowable , TypeGuard } from "@inferred-types/types";
import { isSameTypeOf } from "@inferred-types/runtime";


/**
 * A TypeGuard which was generated from `isEqual()` runtime util.
 */
export type EqualTo<T extends Narrowable> = TypeGuard<T>;

/**
 * **isEqual**(compareTo)(value)
 *
 * Higher order type guard to detect whether two values are equal
 */
export const isEqual = <
  TBase extends Narrowable
>(base: TBase): EqualTo<TBase> =>
   <TValue extends Narrowable>(value: TValue): value is TBase & TValue =>
    isSameTypeOf(base)(value)
      ? value === base
        ? true
        : false
      : false;
