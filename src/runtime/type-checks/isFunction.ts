

export type IsFunction<T> = T extends AnyFunction ? true : false;

export type HybridFunction<TProps extends {}> = (<TArgs extends any[]>(...args: TArgs) => any) &
  TProps;

export type SimpleFunction = (...args: any[]) => any;

export type AnyFunction<TProps extends {} = {}> = SimpleFunction | HybridFunction<TProps>;

/**
 * Checks whether a passed in value is a function and ensures run-time and types
 * are consistent.
 * ```ts
 * // true
 * const yup = isFunction(() => "hello world");
 * ```
 *
 * Note: the runtime `typeof [variable]` will correctly say "function" when a function is
 * encountered but if that function also has object types defined then the type will be a big
 * and ugly union type. This function will give you a proper boolean value in both cases.
 */
export function isFunction<T>(input: T): IsFunction<T> {
  return (typeof input === "function" ? true : false) as IsFunction<T>;
}
