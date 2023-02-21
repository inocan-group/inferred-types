import { NOT_DEFINED } from "src/runtime";
import type { 
  IfNotEqual, 
  ToString, 
  Narrowable, 
  IfUndefined,
  Container,
  ErrorCondition,
  IfContainer,
  Scalar,
  FromMaybeRef
} from "src/types";
import { NoDefaultValue } from "src/constants";

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

type IsDeepPath<T extends string> = T extends `${string}.${string}` ? true : false;

/** gets the next path component of the dotpath */
type GetPath<T extends string> = IsDeepPath<T> extends true
  ? T extends `${infer Prop}.${infer Rest}`
    ? Prop
    : never
  : T;

type GetRest<T extends string> = IsDeepPath<T> extends true
  ? T extends `${infer Prop}.${infer Rest}`
    ? Rest
    : never
  : never;

type _Shallow<
  TContainer extends Container,
  TProp extends string,
  TDotPath extends string
> = TProp extends keyof FromMaybeRef<TContainer>
  ? FromMaybeRef<TContainer>[TProp]
  : ErrorCondition<"invalid">;

/**
 * There are at minimum two levels left of indirection
 */
type _Deep<
  TContainer extends Container,
  TProp extends string,
  TRest extends string,
  TDotPath extends string,
  TDefVal,
  TDepth extends number = 1,
  TMaxDepth extends number = 5
> = TProp extends keyof FromMaybeRef<TContainer>
  ? IfContainer<
      TContainer[TProp],
      // possibility of using remainder of dotpath, so continue
      IsDeepPath<TRest> extends true
        ? _Deep<GetPath<TRest>,GetRest<TRest>, TDotPath, AddOne<TDepth>, TMaxDepth>
        : _Shallow<TContainer, TRest>,
      // there remains dereferencing to be done but value is not
      // a container
      ErrorCondition<"invalid">
    >
  : ErrorCondition<"invalid">;




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
  TContainer extends Container | Scalar,
  TDotPath extends string | number | null,
  TDefVal = NoDefaultValue,
  THandler = typeof NOT_DEFINED
> = TDotPath extends null
  ? TContainer // return "as is"
  : TContainer extends Scalar 
    ? never // scalar values can not be dereferenced
    : IsDeepPath<ToString<TDotPath>> extends true
      ? _Deep<
          TContainer & Container, 
          GetPath<ToString<TDotPath>>, 
          GetRest<ToString<TDotPath>>, 
          ToString<TDotPath>, 
          TDefVal
        >
      : _Shallow<TContainer & Container, ToString<TDotPath>, ToString<TDotPath>>;
  
  
  // TDotPath extends `${infer Prop}.${infer Rest}` 
  // // DEEP DOTPATH
  // ? Prop extends keyof TContainer // T[Prop] exists
  //   ? IfContainer<
  //       TContainer[Prop],
  //       Get<ToContainer<TContainer[Prop]>, Rest, TDefVal, THandler>, // recurse
  //       never
  //     >
  //   : TContainer extends { value: unknown } // T looks like a duck
  //     ? IfRef<
  //         TContainer,
  //         // T quacks like a duck
  //         Prop extends keyof TContainer["value"]
  //           ? IfContainer<
  //               TContainer["value"][Prop],
  //               Get<ToContainer<TContainer["value"][Prop]>, Rest, TDefVal, THandler>, // recurse
  //               never
  //             >
  //           : ResolveHandler<
  //               THandler,
  //               Concat<[Prop, " is not a valid index of the Ref<T> value found at the base"]>
  //             >,
  //         // T is not a duck
  //         ResolveHandler<
  //           THandler,
  //           Concat<["The ", Prop, " segment of the dotpath is invalid" ]>
  //         >
  //       >
  //     : ResolveHandler<
  //         THandler, 
  //         Concat<["The '", Prop, "' segment of the dotpath is invalid with additional segments still remaining"]>
  //       >
  // // SHALLOW DOTPATH
  // : TDotPath extends keyof TContainer
  //   ? "value" extends keyof TContainer[TDotPath]  // T is not duck, but T[K] may be
  //     ? IfRef<
  //         TContainer[TDotPath], 
  //         ResolveDefVal<TContainer[TDotPath]["value"], TDefVal>, // T[K] is ref
  //         ResolveDefVal<TContainer[TDotPath], TDefVal> // T[K] not ref
  //       >
  //     : ResolveDefVal<TContainer[TDotPath], TDefVal> // T[K] not ref
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   : TContainer extends { value: any } // K doesn't index T directly
  //     ? TDotPath extends keyof TContainer["value"] // looks like T is a ref
  //       ? IfRef<
  //           TContainer[TDotPath], // see if T[K] is also a ref
  //           ResolveDefVal<TContainer["value"][TDotPath]["value"], TDefVal>, 
  //           ResolveDefVal<TContainer["value"][TDotPath], TDefVal>
  //         >
  //       : ResolveHandler<
  //           THandler, 
  //           Concat<["The final segment '", ToString<TDotPath>, "' in the dotpath is invalid (base value had a 'value' property but it's not a key of final seg)"]>
  //         >
  //     : ResolveHandler<
  //         THandler, 
  //         Concat<["The final segment '", ToString<TDotPath>, "' in the dotpath is invalid"]>
  //       >;
