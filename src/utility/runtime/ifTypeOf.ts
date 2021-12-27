import { Narrowable } from "~/types/Narrowable";
import { keys } from "../keys";

function runtimeExtendsCheck<TValue extends any, TBase extends any>(
  val: TValue,
  base: TBase,
  narrow: boolean = false
): TValue extends TBase ? true : false {
  if (typeof val !== typeof base) {
    return false as TValue extends TBase ? true : false;
  }

  switch (typeof val) {
    case "boolean":
    case "string":
    case "number":
    case "symbol":
    case "bigint":
      return narrow
        ? ((val === base) as TValue extends TBase ? true : false)
        : (true as TValue extends TBase ? true : false);
    case "undefined":
      return true as TValue extends TBase ? true : false;
    case "function":
      if (narrow) {
        throw new Error(`Use of narrowlyExtends with a function is not possible!`);
      }
      return true as TValue extends TBase ? true : false;
    case "object":
      if (val === null && base === null) {
        return true as TValue extends TBase ? true : false;
      }
      return keys(base as object).every((i) =>
        runtimeExtendsCheck(val[i], base[i], narrow)
      ) as TValue extends TBase ? true : false;
  }
}

/**
 * A conditional clause used in the application of the `ifTypeOf` utility
 */
export type ExtendsClause<
  N extends Narrowable,
  TValue extends Record<keyof TValue, N> | number | string | boolean | symbol
> = <TBase extends any>(base: TBase) => TValue extends TBase ? true : false;

/**
 * A conditional clause used in the application of the `ifTypeOf` utility
 */
export type ExtendsNarrowlyClause<
  N extends Narrowable,
  TValue extends Record<keyof TValue, N> | number | string | boolean | symbol
> = <
  NB extends Narrowable,
  TBase extends Record<keyof TBase, NB> | number | string | boolean | symbol
>(
  base: TBase
) => TValue extends TBase ? true : false;

/**
 * **TypeCondition**
 *
 * A partially applied type from the `ifTypeOf` utility where the base type has been
 * defined and we now need to express the type which is intended to extend it.
 *
 * - `extends` - compares with _wide_ types
 * - `narrowlyExtends` - compares with _narrow_ / _literal_ types
 */
export type TypeCondition<
  N extends Narrowable,
  TValue extends Record<keyof TValue, N> | number | string | boolean | symbol
> = {
  extends: ExtendsClause<N, TValue>;
  narrowlyExtends: ExtendsNarrowlyClause<N, TValue>;
};

export const ifTypeOf = <
  N extends Narrowable,
  TValue extends Record<keyof TValue, N> | number | string | boolean | symbol
>(
  val: TValue
): TypeCondition<N, TValue> => ({
  extends: <TBase extends any>(base: TBase) => {
    const valid = runtimeExtendsCheck(val, base, false);
    const trueFalse = (valid ? true : false) as TValue extends TBase ? true : false;
    return (
      {
        then: <TResult extends any>(then?: TResult) => ({
          else: <TElse extends any>(elseVal: TElse) => {
            return (
              valid ? (typeof then === "undefined" ? val : then) : elseVal
            ) as TValue extends TBase ? (TResult extends undefined ? TValue : TResult) : TElse;
          },
        }),
        else: <TElse extends any>(elseVal: TElse) =>
          valid ? val : (elseVal as TValue extends TBase ? TValue : TElse),
      } && trueFalse
    );
  },

  narrowlyExtends: <
    NB extends Narrowable,
    TBase extends Record<keyof TBase, NB> | number | string | boolean | symbol
  >(
    base: TBase
  ) => {
    const valid = runtimeExtendsCheck(val, base, true);
    const trueFalse = (valid ? true : false) as TValue extends TBase ? true : false;
    return (
      {
        then: <TResult extends any>(then?: TResult) => ({
          else: <TElse extends any>(elseVal: TElse) => {
            return (
              valid ? (typeof then === "undefined" ? val : then) : elseVal
            ) as TValue extends TBase ? (TResult extends undefined ? TValue : TResult) : TElse;
          },
        }),
        else: <TElse extends any>(elseVal: TElse) =>
          valid ? val : (elseVal as TValue extends TBase ? TValue : TElse),
      } && trueFalse
    );
  },
});
