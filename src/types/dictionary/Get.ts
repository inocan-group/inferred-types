import { Concat } from "src/runtime";
import { ErrorCondition } from "src/runtime/literals/ErrorCondition";
import { IfRef } from "../boolean-logic/IfRef";
import { ToString } from "../type-conversion";

/**
 * Get the type of a property of an object:
 * ```ts
 * type Car = { make: "Chevy", model: "Malibu", colors: [
 *    "red", "blue"
 * ]}
 * // "red"
 * type T = Get<Car, "color.0">;
 * ```
 */
export type Get<T, K> = //
  K extends `${infer Prop}.${infer Rest}` // deep 
    ? Prop extends keyof T // T[Prop] exists
      ? Get<T[Prop], Rest> // recurse
      : T extends { value: any } // T looks like a duck
        ? IfRef< 
            T,
            Prop extends keyof T["value"] // T quacks like a duck
              ? Get<T["value"][Prop], Rest>
              : never,
            never
          >
        : never
    : K extends keyof T // K is final dotpath segment
      ? T[K] extends { value: any } // finalize value but may need to unwrap
        ? IfRef<T[K], T[K]["value"], T[K]>
        : T[K] 
      : T extends { value: any } // the base of `T` may be a ref/duck
        ? K extends keyof T["value"] // if "value" is indexable by K then we may have match
          ? IfRef<
            T["value"],
            T["value"][K], // unwrap ref
            T["value"][K]
          >
        : ErrorCondition<"invalid-key", Concat<[ToString<K>, " is not a valid indexable dotpath"]>> // K is an invalid key
  : never;
