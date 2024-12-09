import type {
  If,
  IsFalse,
  IsNumericLiteral,
  IsStringLiteral,
  IsTrue,
  SomeEqual,
} from "inferred-types/types";

/**
 * **IsTruthy**`<T>`
 *
 * A type utility which evaluates `T` for _[truthiness](https://frontend.turing.edu/lessons/module-1/js-truthy-falsy-expressions.html)_ and returns `true` or `false`
 * where the state can be detected at design time; otherwise returns `boolean`.
 *
 * **See Also:** `IfTruthy`, `IfSomeTruthy`, `IfAllTruthy`, and `TruthyReturns`
 */
export type IsTruthy<T> = //
  [T] extends [string]
    ? T extends "" ? false : If<IsStringLiteral<T>, true, boolean>
    : [T] extends [number]
        ? If<
          IsNumericLiteral<T>,
          If<SomeEqual<[0, -0], T>, false, true>,
          boolean
        >
        : [T] extends [boolean]
            ? If<
              IsFalse<T>,
              false,
              If<
                IsTrue<T>,
                true,
                boolean
              >
            >
            : If<
              SomeEqual<[null, undefined, typeof Number.NaN], T>,
              false,
              boolean
            >;
