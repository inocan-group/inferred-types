
/**
 * Given a dictionary of key/values, where the value is a function, this 
 * type utility will maintain the keys but change the values to whatever
 * the `ReturnType` of the function was.
 * ```ts
 * // { foo: string }
 * type Test = UnwrapValue<{ foo: (name: string) => name }>
 * ```
 */
export type UnwrapValue<T extends Record<string, (...args: any[]) => any>> = {
  [K in keyof T]: T[K] extends Function ? ReturnType<T[K]> : never;
}[keyof T];