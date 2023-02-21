/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Narrowable, WithoutKeys,  ErrorCondition, HasUnionType, Key } from "src/types";
import { keys } from "./keys";

/**
 * **omit**(obj, excluding)
 * 
 * Runtime utility which _excludes_ certain **keys** from an object.
 * 
 * - this utility is meant to mimic the type utility `Omit<T,U>` provided
 * by Typescript in runtime
 * - attempts will be made to extract the narrowest possible type from 
 * the passed in object.
 * 
 * ```ts
 * // { baz: 3 }
 * const obj = omit({ foo: 1, bar: 2: baz: 3 }, "foo", "bar");
 * ```
 * 
 * **Related:** `createOmission`, `withoutKeys`
 */
export function omit<
  TObj extends Record<string|symbol, N>,
  N extends Narrowable,
  TKeys extends readonly (Key & keyof TObj)[]
>(obj: TObj, ...removeKeys: TKeys) {
  return [...keys(obj)].reduce(
    (acc, key) => removeKeys.includes(key as any)
      ? acc
      : {
        ...acc,
        [key]: obj[key as keyof TObj]
      },
    {}
  ) as unknown as HasUnionType<TKeys> extends true
    ? ErrorCondition<"invalid-union", "the omit(obj, keys) function was called with keys which included a value which was a union type; this would make the typing inconsistent with the runtime type and should be avoided. Note that at runtime this will not produce an error but rather produce the valid runtime value.", "omit", {keys: typeof removeKeys}>
    : WithoutKeys<TObj, TKeys>;
}
