/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { AnyFunction, IfEqual, IfNotError, FnMeta, FnProps } from "src/types";

/**
 * **AsFn**`<T>`
 * 
 * Converts functions described both in typical TS fashion or via `FnMeta` format
 * to be a strongly typed function (and possibly intersected with a key/value dict).
 * ```ts
 * type Input1 = FnMeta<[],"hi",{ foo: 1 }>;
 * type Input2 = { (): "hi", foo: 1 };
 * // (() => "hi") & { foo: 1 }
 * type Output = AsFn<Input1> | AsFn<Input2>;
 * ```
 * - types not recognized as functions will be returned as _never_ with the exception of
 * an `ErrorCondition` which will be proxied through.
 * 
 * **Related:** `ToFn`
 */
export type AsFn<T> = IfNotError<
  T, 
  T extends AnyFunction
    ? AsFn<FnMeta<
        Parameters<T>,
        ReturnType<T>,
        IfEqual<FnProps<T>, {}, "no-props", FnProps<T>>
      >>
    : T extends FnMeta<any,any,any>
      ? "no-props" extends  T["props"]
        ? (...args: T["args"]) => T["returns"]
        : ((...args: T["args"]) => T["returns"]) & T["props"]
  : never
>;
