import { NOT_DEFINED, NotDefined } from "src/runtime";
import type { 
  IfNotEqual, 
  Narrowable, 
  IfUndefined,
  Container,
  ErrorCondition,
  IfContainer,
  Increment,
  FromMaybeRef,
  DotPathFor,
  IfOptionalScalar,
  IfExtends,
  ErrorConditionHandler
} from "src/types";
import { NoDefaultValue } from "src/constants";
import { ValueAtDotPath } from "../string-literals/character-sets/ValueAtDotPath";

type ResolveDefVal<
  TValue,
  TDefVal
> = IfUndefined<
  TValue,
  TDefVal extends NoDefaultValue
    ? undefined
    : TDefVal,
  TValue
>;

type ResolveHandler<
  TValue,
  THandler
> = IfExtends<
  TValue, ErrorCondition<any>,
  // error condition encountered
  THandler extends NotDefined
    ? TValue
    : THandler extends ErrorConditionHandler 
      ? ReturnType<THandler>
      : THandler,
  // not an error
  TValue
>;






/**
 * **Get**`<T,K,[DevVal, Handler]>`
 * 
 * Get the type of a property of an object:
 * ```ts
 * type Car = { 
 *    make: "Chevy", 
 *    model: "Malibu", 
 *    colors: [ "red", "blue" ]
 * }
 * // "red"
 * type T = Get<Car, "colors.0">;
 * ```
 * 
 * - if a _valid_ dotpath leads to a value which is optionally
 * undefined, you may specify a _default value_ with `TDefVal`
 * - if you want to resolve an _invalid_ dotpath to something
 * besides the default `ErrorCondition<"invalid-path">`
 * you can set `THandler` to the type you'd like it to become.
 */
export type Get<
  TContainer,
  TDotPath extends string | number | null,
  TDefVal = NoDefaultValue,
  THandler = NotDefined
> = TDotPath extends ""
  ? TContainer // return "as is"
  : TDotPath extends null
  ? TContainer // return "as is"
  : IfOptionalScalar<
      TContainer,
      ResolveHandler<
        ErrorCondition<"invalid-path", `The path of "${TDotPath}" is an invalid dotpath and can not be used!`, "Get<TContainer,TDotPath>">,
        THandler
      >,
      // get value
      ResolveHandler<
        ResolveDefVal<
          ValueAtDotPath<TContainer, ToString<TDotPath>>,
          TDefVal
        >,
        THandler
      >
    >;
  