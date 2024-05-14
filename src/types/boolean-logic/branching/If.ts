import { ErrorCondition, IsBoolean, IsBooleanLiteral, IsFalse, IsNever, IsTrue, LogicFunction, Throw, } from "src/types/index";

type InvalidTest<TTest> = Throw<
  "invalid-test",
  `Call of If<TTest, ...> received an invalid TTest that does not evaluate to a boolean type!`,
  "If",
  { 
    library: "inferred-types"; 
    test: TTest; 
  }
>

type ErrorInTest<TTest extends ErrorCondition> =Throw<
  "error-in-test",
  `While evaluating If<TTest,...> an ErrorCondition rather than a boolean was found in TTest`,
  "If",
  { 
    library: "inferred-types"; 
    underlying: TTest;
  }
>;


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
  TNever = never
> =  [IsNever<TTest>] extends [true]
? TNever
: [TTest] extends [ErrorCondition]
  ? ErrorInTest<TTest>
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
        : InvalidTest<TTest>
    : InvalidTest<TTest>;
