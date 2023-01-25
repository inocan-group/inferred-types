import type { Type, TypeGuard } from "src/types";

export function createTypeGuard<T extends Exclude<Type, "is" | "validate">>(defn: T): T & Record<"is", TypeGuard<T["type"]>> {

  return {
    ...defn,
    /**
     * **is**(value)
     * 
     * Type guard which is able to able to identify and narrow the
     * type definition of a runtime type defined by `Type`
     */
    is: (value: unknown): value is T["type"] => {
      return true;
    }
  } satisfies Type;
}
