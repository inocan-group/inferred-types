import type {
  AsString,
  ErrorCondition,
  IsBoolean,
  IsFalse,
  IsTrue,
  IsWideType,
  LogicFunction,
} from "inferred-types/types";

type WideBooleanNotAllowed = ErrorCondition<
  "wide-boolean-not-allowed",
  `Call to Validate<T,E> received a wide boolean type for T!`
>;

type WideReturnNotAllowed<T> = ErrorCondition<
  "wide-return-not-allowed",
  `Call to Validate<T,E> returned a wide type: ${AsString<T>}!`
>;

/**
 * **Validate**`<T,[E]>`
 *
 * Branching utility which proxies through the value of `T` when it is
 * **not** `false` or _returns_ false, otherwise it passes along `E`.
 *
 * - `E` by default is _never_
 * - if `T` is a wide boolean type an `ErrorCondition<"wide-boolean-not-allowed">`
 * will be returned
 *
 * ```ts
 * const fn = <T extends string>(dp: T & Validate<IsDotPath<T>>) => {}
 * ```
 */
export type Validate<
  TTest,
  TErr = never,
> = [IsTrue<TTest>] extends [true]
  ? TTest
  : [IsFalse<TTest>] extends [true]
      ? TErr
      : [IsBoolean<TTest>] extends [true]
          ? WideBooleanNotAllowed
          : [TTest] extends [LogicFunction]
              ? [IsTrue<ReturnType<TTest>>] extends [true]
                  ? TTest
                  : [IsFalse<ReturnType<TTest>>] extends [true]
                      ? TErr
                      : WideBooleanNotAllowed
              : [IsWideType<TTest>] extends [true]
                  ? WideReturnNotAllowed<TTest>
                  : TTest;
