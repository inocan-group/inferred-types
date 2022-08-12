export interface DefinePropertiesApi<T extends {}> {
  /**
   * Makes a property on the object **readonly** on the Javascript runtime
   */
  ro<K extends keyof T>(
    prop: K,
    errorMsg?: (p: K, v: any) => string
  ): Omit<T, K> & Record<K, Readonly<T[K]>>;
  /**
   * Makes a property on the object **read/writeable** on the Javascript runtime;
   * this is the default so only use this where it is needed.
   */
  rw<K extends keyof T>(prop: K): Omit<T, K> & Record<K, Readonly<T[K]>>;
}

export function defineProperties<T extends {}>(obj: T) {
  return {
    ro(prop, errorMsg) {
      Object.defineProperty(obj, prop, {
        writable: false,
        set(v: any) {
          const message = errorMsg
            ? errorMsg(prop, v)
            : `The ${String(
                prop
              )} is readonly but an attempt was made to change it's value to "${JSON.stringify(
                v
              )}"!`;
          throw new Error(message);
        },
      });
      return obj;
    },
  } as DefinePropertiesApi<T>;
}
