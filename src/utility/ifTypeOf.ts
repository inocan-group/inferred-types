import { Narrowable } from "~/types/Narrowable";
import { keys } from "./Keys";

function runtimeExtendsCheck<
  TValue extends any,
  TBase extends any
>(val: TValue, base: TBase, narrow: boolean = false): TValue extends TBase ? true : false {
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
        ? (val === base) as TValue extends TBase ? true : false
        : true as TValue extends TBase ? true : false;
    case "undefined":
      return true as TValue extends TBase ? true : false;
    case "function":
      // narrow checking is a bit hacky for functions; is there a better way?
      return narrow
        ? (val.toString() === (base as Function).toString()) as TValue extends TBase ? true : false
        : true as TValue extends TBase ? true : false;
    case "object":
      if (val === null && base === null) {
        return true as TValue extends TBase ? true : false;
      }
      return keys(val as object).every(i => runtimeExtendsCheck(val[i], base[i], narrow)) as TValue extends TBase ? true : false;
  }
}

export const ifTypeOf = <N extends Narrowable, TValue extends Record<keyof TValue, N>>(val: TValue) => ({
  extends: <TBase extends any>(base: TBase) => {
    const valid = runtimeExtendsCheck(val, base);
    const trueFalse = (valid ? true : false) as TValue extends TBase ? true : false;
    return {
      then: <TResult extends any>(then?: TResult) => ({
        else: <TElse extends any>(elseVal: TElse) => {
          return (valid ? typeof then === "undefined" ? val : then : elseVal) as TValue extends TBase ? TResult extends undefined ? TValue : TResult : TElse;
        },
      }),
      else: <TElse extends any>(elseVal: TElse) => valid ? val : elseVal as TValue extends TBase ? TValue : TElse
    } && trueFalse;
  },

  narrowlyExtends: <N extends Narrowable, TBase extends Record<keyof TBase, N>>(base: TBase) => {
    const valid = runtimeExtendsCheck(val, base, true);
    const trueFalse = (valid ? true : false) as TValue extends TBase ? true : false;
    return {
      then: <TResult extends any>(then?: TResult) => ({
        else: <TElse extends any>(elseVal: TElse) => {
          return (valid ? typeof then === "undefined" ? val : then : elseVal) as TValue extends TBase ? TResult extends undefined ? TValue : TResult : TElse;
        },
      }),
      else: <TElse extends any>(elseVal: TElse) => valid ? val : elseVal as TValue extends TBase ? TValue : TElse
    } && trueFalse;
  }
});


const ident = <N extends Narrowable, T extends Record<any, N> | number | string | boolean>(v: T) => v;

const foo = ident({ foo: 1, bar: 2 });