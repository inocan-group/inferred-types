import type {
    And,
    As,
    Contains,
    DoesExtend,
    EndsWith,
    ErrorCondition,
    Extends,
    IsEqual,
    IsGreaterThan,
    IsGreaterThanOrEqual,
    IsLessThan,
    IsLessThanOrEqual,
    NumberLike,
    StartsWith,
    Tuple,
    TypedFunction,
    WhenNever,
} from "inferred-types/types";

/**
 * comparison operators which require the base type to be a string
 */
export type StringComparatorOperation =
    | "startsWith"
    | "endsWith";

export type NumericComparatorOperation =
    | "greaterThan"
    | "greaterThanOrEqual"
    | "lessThan"
    | "lessThanOrEqual";

/**
 * **ComparatorOperation**
 *
 * A union type providing various ways in which two values
 * can be compared.
 *
 * **Related:** `StringComparatorOperation`, `NumericComparatorOperation`
 */
export type ComparatorOperation =
    | "extends"
    | "equals"
    | StringComparatorOperation
    | "contains"
    | "containsAll"
    | NumericComparatorOperation
    | "returnEquals"
    | "returnExtends";

/**
 * **ParamsForComparison**`<T>`
 *
 * Provides a lookup function on `T` of the _parameters_ required
 * for a given `ComparatorOperation`.
 */
export type ParamsForComparison<
    T extends ComparatorOperation,
> =
  T extends "equals"
      ? readonly [unknown]
      : T extends "extends"
          ? readonly [unknown]
          : T extends "startsWith"
              ? [string | number]
              : T extends "endsWith"
                  ? readonly [[string | number] | Tuple<unknown, 1>]
                  : T extends "contains"
                      ? readonly [unknown, ...Tuple[]]
                      : T extends "containsAll"
                          ? readonly [unknown, ...Tuple[]]
                          : T extends "greaterThan"
                              ? readonly [NumberLike]
                              : T extends "greaterThanOrEqual"
                                  ? readonly [NumberLike]
                                  : T extends "lessThan"
                                      ? readonly [NumberLike]
                                      : T extends "lessThanOrEqual"
                                          ? readonly [NumberLike]
                                          : never;

/**
 * **Comparison**`<TOp,TArgs>`
 *
 * A strongly typed comparison which can be used in runtime utilities
 * like `filter`, `retain`, and `map`.
 *
 * - typically generated with the `createComparison(op,...params)` runtime utility.
 *
 * ```ts
 * // Comparison<"equals",[true]>
 * const isTrue = createComparison("equals", true);
 * //
 * const filtered = filter(isTrue)(listOfStuff);
 * ```
 */
export type Comparison<
    TOp extends ComparatorOperation = ComparatorOperation,
    TArgs extends ParamsForComparison<TOp> = ParamsForComparison<TOp>,
    TFn extends TypedFunction = TypedFunction,
> = Extends<TArgs, ParamsForComparison<TOp>> extends true
    ? {
        kind: "Comparison";
        op: TOp;
        args: TArgs;
        fn: TFn;
    }
    : ErrorCondition<"invalid-comparison">;

type Process<
    TVal,
    TOp extends ComparatorOperation,
    TComparator,
> = TOp extends "extends"
    ? DoesExtend<TVal, TComparator>
    : TOp extends "equals"
        ? IsEqual<TVal, TComparator>
        : TOp extends "contains"
            ? [TVal] extends [string | number | Tuple]
                ? Contains<TVal, TComparator>
                : never
            : TOp extends "containsAll"
                ? [TVal] extends [Tuple]
                    ? [TComparator] extends [string | number | readonly string[]]
                        ? Contains<TVal, TComparator>
                        : never
                    : never
                : TOp extends "startsWith"
                    ? [TVal] extends [string | number]
                        ? [TComparator] extends [string | number | readonly string[]]
                            ? StartsWith<TVal, TComparator>
                            : never
                        : never
                    : TOp extends "greaterThan"
                        ? And<[Extends<TComparator, NumberLike>, Extends<TVal, NumberLike>]> extends true
                            ? IsGreaterThan<As<TVal, NumberLike>, As<TComparator, NumberLike>>
                            : never
                        : TOp extends "greaterThanOrEqual"
                            ? And<[Extends<TComparator, NumberLike>, Extends<TVal, NumberLike>]> extends true
                                ? IsGreaterThanOrEqual<As<TVal, NumberLike>, As<TComparator, NumberLike>>
                                : never

                            : TOp extends "lessThan"
                                ? And<[Extends<TComparator, NumberLike>, Extends<TVal, NumberLike>]> extends true
                                    ? IsLessThan<As<TVal, NumberLike>, As<TComparator, NumberLike>>
                                    : never
                                : TOp extends "lessThanOrEqual"
                                    ? And<[Extends<TComparator, NumberLike>, Extends<TVal, NumberLike>]> extends true
                                        ? IsLessThanOrEqual<As<TVal, NumberLike>, As<TComparator, NumberLike>>
                                        : never
                                    : TOp extends "endsWith"
                                        ? [TVal] extends [string | number]
                                            ? [TComparator] extends [string | number | readonly string[]]
                                                ? EndsWith<TVal, TComparator>
                                                : never
                                            : never
                                        : TOp extends "returnEquals"
                                            ? TVal extends ((...args: any[]) => any) ? IsEqual<ReturnType<TVal>, TComparator> : false
                                            : TOp extends "returnExtends"
                                                ? TVal extends ((...args: any[]) => any) ? IsEqual<ReturnType<TVal>, TComparator> : false
                                                : never;

/**
 * **Compare**`<TVal,TOp,TComparator>`
 *
 * Compares the value `TVal` with `TComparator` using
 * the `TOp` _operator_.
 */
export type Compare<
    TVal,
    TOp extends ComparatorOperation,
    TComparator,
> = WhenNever<
    Process<TVal, TOp, TComparator>
>;
