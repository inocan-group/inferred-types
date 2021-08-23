import { FunctionType } from "~/types";

export type IsFunction<T> = T extends FunctionType ? true : false;

/**
 * Checks whether a passed in value is a function and ensures run-time and types
 * are consistent.
 * ```ts
 * // true
 * const yup = isFunction(() => "hello world");
 * ```
 *
 * Note: the runtime `typeof [variable]` will correctly say "function" when a function is
 * encounted but if that function also has object types defined then the type will be a big
 * and ugly union type. This function will give you a proper boolean value in both cases.
 */
export function isFunction<T extends unknown>(input: T): IsFunction<T> {
  return (typeof input === "function") as IsFunction<T>;
}
