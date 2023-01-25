import { Type } from "src/types";

export function createTypeGuard<T extends Type>(defn: T) {
  
  return {
    ...defn,
    /**
     * **is**(value)
     * 
     * Type guard which is able to able to identify and narrow the
     * type definition of a runtime type defined by `Type`
     */
    is: (value: unknown): value is T => {
      return true;
    }
  } satisfies Type;
}
