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

// TODO: create a function which takes the unique value as a parameter instead of having static functions above
/**
 * Takes an array of type `<T>` and spreads it out into a dictionary while preserving the type
 * literal value in `key` property.
 */
// export function discriminatedArrayToDictionary<T extends {}>(arr: readonly T[]) {
//   return <K extends keyof T & PropertyKey>(key: K) => {
//     const keys = arr.map((i) => i[key]);

//     return arr.reduce((acc, v) => ({ ...acc, [key]: v }), {} as { [V in T as V[K]]: V });
//   };
// }
