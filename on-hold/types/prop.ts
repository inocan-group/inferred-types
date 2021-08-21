import { isNonNullObject } from "common-types";
import { TypeGuard } from "~/types/TypeGuard";
import { keys } from "~/utility/keys";
import { RuntimeProp, RuntimeType } from "~/types/runtime";

export const prop = <
  P extends PropertyKey,
  T extends RuntimeType<any>,
  O extends object
>(prop: Readonly<P>, type: Readonly<T>, _opts: O = {} as O): RuntimeProp<P, T> => {

  /**
   * Default type guard for a property; relies on underlying type's typeguard for validation
   */
  const tg: TypeGuard<Record<P, T["type"]>> = (v: unknown): v is Record<P, T["type"]> => {
    return isNonNullObject(v) && keys(v as Record<P, any>).includes(prop) && type.is((v as Record<P, any>)[prop as P]);
  };

  return {
    __kind: "prop",

    key: prop,
    valueType: type.type as unknown as Readonly<T["type"]>,
    type: type.type as unknown as Record<P, T["type"]>,

    is: tg
  };
};