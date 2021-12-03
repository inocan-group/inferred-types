type ValueFunction<T extends any> = <R extends any>(v: T) => R;

/**
 * **SameKeys**
 *
 * Given a dictionary `T` and a type-strong wrapper function `F`, returns a dictionary with the
 * same keys but 
 * 
 * Note: meant to be used as part of an _extends_ clause in most cases.
 */
export type WrapValue<T extends {}, F extends ValueFunction<T>> = {
  [P in keyof T]: ReturnType<F>;
};


