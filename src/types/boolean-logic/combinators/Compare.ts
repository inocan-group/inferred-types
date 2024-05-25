 

import { 
  Contains, 
  DoesExtend, 
  IsEqual, 
  StartsWith, 
  TupleToUnion, 
  EndsWith, 
  Tuple,
  ErrorCondition,
  Extends,
  NumberLike,
  TypedFunction,
} from "src/types/index";

/**
 * **ComparatorOperation**
 * 
 * A union type providing various ways in which two values
 * can be compared.
 */
export type ComparatorOperation = 
| "extends"
| "equals"
| "startsWith"
| "endsWith"
| "contains"
| "containsAll"
| "greaterThan"
| "greaterThanOrEqual"
| "lessThan"
| "lessThanOrEqual"
| "returnEquals"
| "returnExtends";

/**
 * **ParamsForComparison**`<T>`
 * 
 * Provides a lookup function on `T` of the _parameters_ required
 * for a given `ComparatorOperation`.
 */
export type ParamsForComparison<
  T extends ComparatorOperation
> = 
T extends "equals"
? readonly [unknown]
: T extends "extends"
? readonly [unknown]
: T extends "startsWith"
?  [string | number]
: T extends "endsWith"
? readonly [[string | number] | Tuple<unknown, 1>]
: T extends "contains"
? readonly [unknown,...Tuple[]]
: T extends "containsAll"
? readonly [unknown,...Tuple[]]
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
  TFn extends TypedFunction = TypedFunction
> = Extends<TArgs, ParamsForComparison<TOp>> extends true
? {
    kind: "Comparison";
    op: TOp;
    args: TArgs;
    fn: TFn;
  }
: ErrorCondition<"invalid-comparison">;



type Unionize<T> = T extends readonly unknown[]
  ? TupleToUnion<T>
  : T;

type Process<
TVal,
TOp extends ComparatorOperation, 
TComparator
> = TOp extends "extends"
? DoesExtend<TVal, Unionize<TComparator>>
: TOp extends "equals"
? IsEqual<TVal, Unionize<TComparator>>
: TOp extends "contains"
  ? [TVal] extends [string | number | Tuple]
    ? Contains<TVal,TComparator>
    : never
: TOp extends "containsAll"
? [TVal] extends [Tuple]
  ? [TComparator] extends [string | number | readonly string[]]
    ? Contains<TVal,TComparator>
    : never
  : never
: TOp extends "startsWith"
? [TVal] extends [string | number]
? [TComparator] extends [string | number | readonly string[]]
  ? StartsWith<TVal, TComparator>
  : never
: never
: TOp extends "endsWith"
? [TVal] extends [string | number]
? [TComparator] extends [string | number | readonly string[]]
  ? EndsWith<TVal, TComparator>
  : never
: never
: TOp extends "returnEquals"
? TVal extends ((...args: any[]) => any) ? IsEqual<ReturnType<TVal>,TComparator> : false
: TOp extends "returnExtends"
? TVal extends ((...args: any[]) => any) ? IsEqual<ReturnType<TVal>,TComparator> : false
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
TComparator
> = Process<TVal, TOp, TComparator>;
