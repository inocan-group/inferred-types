import { IsBoolean, IsFalse, IsNever, IsTrue, IsTruthy } from "inferred-types/types";
import { LogicFunction } from "src/functions";

export type LogicHandler = "truthy" | "false" | "never";

type Handle<
    TVal,
    THandler extends LogicHandler
> = THandler extends "truthy"
? IsTruthy<TVal>
: THandler extends "false"
? false
: THandler extends "never"
? never
: never;

/**
 * Converts any type `T` into a `true`, `false` or `boolean`.
 *
 * - if `never` is passed in it will always be proxied through
 * - if a value is neither:
 *   - `true`, `false`, or `boolean`
 *   - nor _returns_ `true`, `false`, or `boolean`
 * - the generic `U` will come into effect
 *   - by default it is set to `truthy`
 */
export type Logic<
    T,
    U extends LogicHandler = "truthy"
> = [IsTrue<T>] extends [true]
        ? true
        : [IsFalse<T>] extends [true]
        ? false
        : [IsBoolean<T>] extends [true]
        ? boolean
        : [IsNever<T>] extends [true]
        ? never
        : [T] extends [LogicFunction]
            ? [IsTrue<ReturnType<T>>] extends [true]
                ? true
            : [IsFalse<ReturnType<T>>] extends [true]
                ? false
            : [IsBoolean<ReturnType<T>>] extends [true]
                ? boolean
                : [IsNever<ReturnType<T>>] extends [true]
                ? never
                : Handle<T,U>
            : Handle<T,U>;

