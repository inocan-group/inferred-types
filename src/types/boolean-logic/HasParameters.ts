import { AnyFunction } from "src/runtime";
import { Length } from "../lists/Length";
import { Narrowable } from "../Narrowable";
import { IsEqual } from "./equivalency";

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
export type HasParameters<T extends Narrowable> = T extends AnyFunction
  ? IsEqual<Length<Parameters<T>>, 0> extends true
    ? false
    : true
  : false;
