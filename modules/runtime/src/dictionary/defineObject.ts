import type { DefineObject, FromDefineObject, MakeKeysOptional } from "inferred-types/types";


type Returns<T extends DefineObject, P extends readonly (keyof T & string)[]> = P["length"] extends 0
? FromDefineObject<T>
: MakeKeysOptional<T,P> extends DefineObject
  ? FromDefineObject<MakeKeysOptional<T,P>>
  : never;

/**
 * Takes an object definition where the values are either
 * `SimpleToken` representations of a type or a `ShapeCallback`.
 *
 * In both cases the runtime type is left unchanged but the
 * type is converted to represent the designed object shape.
 */
export function defineObject<T extends DefineObject, P extends readonly (keyof T & string)[]>(
  defn: T,
  ...optProps: P
): Returns<T,P> {
  return defn as unknown as Returns<T,P>;
}
