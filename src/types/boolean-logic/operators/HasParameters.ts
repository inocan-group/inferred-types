import { AnyFunction } from "src/types/base-types";
import { Length } from "src/types";
import { IsEqual } from "src/types";

/**
 * **HasParameters**`<T>`
 *
 * Type utility which detects if `T` is both a function and whether that
 * function has at least one type parameter.
 * ```ts
 * const fn = (foo: string) => `${foo}bar`;
 * // true
 * type P = HasParameters<typeof fn>;
 * ```
 */
export type HasParameters<T> = T extends AnyFunction
  ? IsEqual<Length<Parameters<T>>, 0> extends true
    ? false
    : true
  : false;
