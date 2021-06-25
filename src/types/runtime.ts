import { TypeGuard } from "~/types";

// runtime types relate to the types coming out of the runtime utilities

export type RuntimeType<T> = {
  __kind: "type";

  type: T;
  is: TypeGuard<T>;
};

export type RuntimeProp<P extends Readonly<PropertyKey>, T extends RuntimeType<any>> = {
  __kind: "prop";
  key: Readonly<P>;
  valueType: Readonly<T["type"]>;
  /**
 * Provides the _type_ to the type system when used with `typeof`.
 * 
 * ```ts
 * const t = number();
 * // number
 * type T = typeof t.type;
 * ```
 * 
 * **Note:** _the runtime system will get a string equivalent name:_
 * ```ts
 * const t = number();
 * // "number"
 * console.log(t.type);
 * ```
 */
  type: Record<P, T["type"]>;
  is: TypeGuard<Record<P, T["type"]>>;
};

export type TypeOptions<T extends Partial<object> = {}> = {
  /** each type has a default type guard but you can override if you need to be more specific */
  typeGuard?: TypeGuard<T>;
} & T;