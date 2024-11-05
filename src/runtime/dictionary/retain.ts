import { Throw, HasUnionType, NarrowObject, Narrowable,  ObjectKey,  WithKeys } from "inferred-types/dist/types/index";

/**
 * **retain**(obj,...keys)
 *
 * Reduces the key/value pairs in an object to those keys
 * explicitly stated.
 *
 * **Related:** `createRetainer`, `omit`
 */
export const retain = <
  N extends Narrowable,
  TObj extends NarrowObject<N>,
  TKeys extends readonly (ObjectKey & keyof TObj)[]
>(
  dict: TObj,
  ...keys: TKeys
) => {
  let output: Record<string, unknown> = {};
  for (const k of keys) {
    output = {
      ...output,
      [k]: dict[k]
    };
  }

  return output as unknown as HasUnionType<TKeys> extends true
  ? Throw<
      "invalid-union",
      "the retain(obj, keys) function was called with keys which included a value which was a union type; this would make the typing inconsistent with the runtime type and should be avoided. Note that at runtime this will not produce an error but rather produce the valid runtime value.",
      "retain()",
      { keys: TKeys }
    >
  : WithKeys<TObj, TKeys>;
};
