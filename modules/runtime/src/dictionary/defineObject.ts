import type { DefineObject, FromDefn } from "inferred-types/types";

/**
 * Takes an object definition where the values are either
 * `SimpleToken` representations of a type or a `ShapeCallback`.
 *
 * In both cases the runtime type is left unchanged but the
 * type is converted to represent the designed object shape.
 */
export function defineObject<T extends DefineObject>(defn: T): FromDefn<T> {
  return defn as unknown as FromDefn<T>;
}
