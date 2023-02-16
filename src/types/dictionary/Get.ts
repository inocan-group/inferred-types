import { ErrorCondition, NOT_DEFINED } from "src/runtime";
import { 
  Concat, 
  IfNotEqual, 
  IfRef, 
  ToString, 
  Narrowable, 
  IfUndefined,
  AnyObject
} from "src/types";
import { NoDefaultValue } from "src/constants/NoDefaultValue";

type ResolveDefVal<
  TValue extends Narrowable,
  TDefVal extends Narrowable
> = IfUndefined<
  TValue,
  TDefVal extends NoDefaultValue
    ? undefined
    : TDefVal,
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
  TContainer extends AnyObject | readonly Narrowable[], 
  TDotPath extends string | number | null,
  TDefVal extends Narrowable = NoDefaultValue,
  THandler extends Narrowable = typeof NOT_DEFINED
> = TDotPath extends null
  ? TContainer
  : TDotPath extends `${infer Prop}.${infer Rest}` 
  // DEEP DOTPATH
  ? Prop extends keyof TContainer // T[Prop] exists
    ? Get<TContainer[Prop], Rest, TDefVal, THandler> // recurse
    : TContainer extends { value: unknown } // T looks like a duck
      ? IfRef<
          TContainer,
          // T quacks like a duck
          Prop extends keyof TContainer["value"] 
            ? Get<TContainer["value"][Prop], Rest, TDefVal, THandler> // recurse
            : ResolveHandler<
                THandler,
                Concat<[Prop, " is not a valid index of the Ref<T> value found at the base"]>
              >,
          // T is not a duck
          ResolveHandler<
            THandler,
            Concat<["The ", Prop, " segment of the dotpath is invalid" ]>
          >
        >
      : ResolveHandler<
          THandler, 
          Concat<["The '", Prop, "' segment of the dotpath is invalid with additional segments still remaining"]>
        >
  // SHALLOW DOTPATH
  : TDotPath extends keyof TContainer
    ? "value" extends keyof TContainer[TDotPath]  // T is not duck, but T[K] may be
      ? IfRef<
          TContainer[TDotPath], 
          ResolveDefVal<TContainer[TDotPath]["value"], TDefVal>, // T[K] is ref
          ResolveDefVal<TContainer[TDotPath], TDefVal> // T[K] not ref
        >
      : ResolveDefVal<TContainer[TDotPath], TDefVal> // T[K] not ref
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    : TContainer extends { value: any } // K doesn't index T directly
      ? TDotPath extends keyof TContainer["value"] // looks like T is a ref
        ? IfRef<
            TContainer[TDotPath], // see if T[K] is also a ref
            ResolveDefVal<TContainer["value"][TDotPath]["value"], TDefVal>, 
            ResolveDefVal<TContainer["value"][TDotPath], TDefVal>
          >
        : ResolveHandler<
            THandler, 
            Concat<["The final segment '", ToString<TDotPath>, "' in the dotpath is invalid (base value had a 'value' property but it's not a key of final seg)"]>
          >
      : ResolveHandler<
          THandler, 
          Concat<["The final segment '", ToString<TDotPath>, "' in the dotpath is invalid"]>
        >;
