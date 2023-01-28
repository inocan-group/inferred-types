import { NotEqual } from "@type-challenges/utils";
import { ErrorCondition, NOT_DEFINED } from "../../../src/runtime";
import { 
  Concat, 
  IfNotEqual, 
  IsUndefined, 
  IfAnd, 
  IfRef, 
  ToString, 
  Narrowable 
} from "../../types";
import { NO_DEFAULT_VALUE } from "../constants/NoDefaultValue";

type ResolveDefVal<
  TValue extends Narrowable,
  TDefVal extends Narrowable
> = IfAnd<
  [ IsUndefined<TValue>, NotEqual<TDefVal, typeof NO_DEFAULT_VALUE>],
  TDefVal,
  TValue
>;

type ResolveHandler<
  THandler extends Narrowable,
  TMessage extends string
> = IfNotEqual<
  THandler, typeof NOT_DEFINED, 
  THandler, 
  ErrorCondition<"invalid-dot-path", TMessage, "get(val, key)">
>;

/**
 * **Get**`<T,K,[DevVal, Handler]>`
 * 
 * Get the type of a property of an object:
 * ```ts
 * type Car = { make: "Chevy", model: "Malibu", colors: [
 *    "red", "blue"
 * ]}
 * // "red"
 * type T = Get<Car, "color.0">;
 * ```
 */
export type Get<
  T, 
  K,
  DefVal extends Narrowable = typeof NO_DEFAULT_VALUE,
  Handler extends Narrowable = typeof NOT_DEFINED
> = //
  K extends `${infer Prop}.${infer Rest}` 
  // DEEP DOTPATH
  ? Prop extends keyof T // T[Prop] exists
    ? Get<T[Prop], Rest, DefVal, Handler> // recurse
    : T extends { value: any } // T looks like a duck
      ? IfRef<
          T,
          // T quacks like a duck
          Prop extends keyof T["value"] 
            ? Get<T["value"][Prop], Rest, DefVal, Handler> // recurse
            : ResolveHandler<
                Handler,
                Concat<[Prop, " is not a valid index of the Ref<T> value found at the base"]>
              >,
          // T is not a duck
          ResolveHandler<
            Handler,
            Concat<["The ", Prop, " segment of the dotpath is invalid" ]>
          >
        >
      : ResolveHandler<
          Handler, 
          Concat<["The '", Prop, "' segment of the dotpath is invalid with additional segments still remaining"]>
        >
  // SHALLOW DOTPATH
  : K extends keyof T
    ? "value" extends keyof T[K]  // T is not duck, but T[K] may be
      ? IfRef<
          T[K], 
          ResolveDefVal<T[K]["value"], DefVal>, // T[K] is ref
          ResolveDefVal<T[K], DefVal> // T[K] not ref
        >
      : ResolveDefVal<T[K], DefVal> // T[K] not ref
    : T extends { value: any } // K doesn't index T directly
      ? K extends keyof T["value"] // looks like T is a ref
        ? IfRef<
            T[K], // see if T[K] is also a ref
            ResolveDefVal<T["value"][K]["value"], DefVal>, 
            ResolveDefVal<T["value"][K], DefVal>
          >
        : ResolveHandler<
            Handler, 
            Concat<["The final segment '", ToString<K>, "' in the dotpath is invalid (base value had a 'value' property but it's not a key of final seg)"]>
          >
      : ResolveHandler<
          Handler, 
          Concat<["The final segment '", ToString<K>, "' in the dotpath is invalid"]>
        >;
