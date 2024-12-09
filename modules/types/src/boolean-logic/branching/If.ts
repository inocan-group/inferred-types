import {
  ErrorCondition,
  IsBoolean,
  IsBooleanLiteral,
  IsFalse,
  IsNever,
  IsTrue,
  LogicFunction
} from "inferred-types/types";





/**
 * **If**`<TTest,[TIf],[TElse],[TMaybe]>`
 *
 * Branching utility which tests `TTest` for a boolean value.
 */
export type If<
  TTest,
  TIf = true,
  TElse = false,
  TMaybe = TIf | TElse,
  TNever = never,
  TError = never
> =  [IsNever<TTest>] extends [true]
? TNever
: [TTest] extends [ErrorCondition]
  ? TError
: [TTest] extends [boolean]
  ? [IsTrue<TTest>] extends [true]
    ? TIf
    : [IsBooleanLiteral<TTest>] extends [true]
      ? TElse
      : TMaybe
  : [TTest] extends [LogicFunction]
    ? [IsTrue<ReturnType<TTest>>] extends [true]
      ? TIf
    : [IsFalse<ReturnType<TTest>>] extends [true]
      ? TElse
      : [IsBoolean<ReturnType<TTest>>] extends [true]
        ? TMaybe
        : never
    : never;
