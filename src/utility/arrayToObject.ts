// TODO: look into renaming these functions

/**
 * Takes a strongly typed array of objects and converts it into a dictionary
 * of objects while preserving the strong typing in the original objects.
 *
 * > **Note:** this depends on objects providing a `kind` property which distinguishes
 * the data structure of the object
 */
export function arrayToObjectKind<T extends { kind: S }, S extends PropertyKey>(
  /** an array of objects */
  arr: readonly T[]
) {
  return arr.reduce((acc, v) => ({ ...acc, [v.kind]: v }), {} as { [V in T as V["kind"]]: V });
}

/**
 * Takes a strongly typed array of objects and converts it into a dictionary
 * of objects while preserving the strong typing in the original objects.
 *
 * > **Note:** this depends on objects providing a `name` property which distinguishes
 * the data structure of the object
 */
export function arrayToObjectName<T extends { name: S }, S extends PropertyKey>(
  /** an array of objects */
  arr: readonly T[]
) {
  return arr.reduce((acc, v) => ({ ...acc, [v.name]: v }), {} as { [V in T as V["name"]]: V });
}
