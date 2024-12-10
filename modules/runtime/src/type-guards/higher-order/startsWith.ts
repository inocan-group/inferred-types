import type { Narrowable } from "inferred-types/types";
import { isNumber, isString } from "inferred-types/runtime";

/**
 * **StartingWithTypeGuard**`<literal>`
 *
 * A type guard built using the `startsWith` utility.
 */
export type StartingWithTypeGuard<TStartsWith extends string> = <
  TValue extends Narrowable,
>(val: TValue
) => val is TValue & `${TStartsWith}${string}`;

/**
 * **startsWith**(startingWith) => (val)
 *
 * A higher-level builder pattern which is used to create a TypeGuard
 * which checks whether a string _starts with_ another substring.
 *
 * ```ts
 * // StartingWithTypeGuard<"foo">
 * const foo = startsWith("foo");
 * // true
 * const yup = foo("foobar");
 * // false
 * const nope = foo("bar");
 * // boolean
 * const weWillSee = foo(string);
 * ```
 */
export function startsWith<
  TStartsWith extends string,
>(startingWith: TStartsWith): StartingWithTypeGuard<TStartsWith> {
  return <
    TValue extends Narrowable,
  >(val: TValue): val is TValue & `${TStartsWith}${string}` => {
    return (
      isString(val)
        ? !!val.startsWith(startingWith)
        : isNumber(val)
          ? !!String(val).startsWith(startingWith)
          : false
    );
  };
}
