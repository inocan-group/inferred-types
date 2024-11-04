import { AsError, Concat, Contains, IfEqual, Defined, Tuple, NarrowlyContains } from "@inferred-types/types";

type left = 1;
type right = 2;

/**
 * **LeftRight**`<L,R>`
 *
 * A tuple which has two possible states represented as `L`
 * and `R`.
 *
 * **Related:** `AsLeft`, `AsRight`, `WhereLeft`, `HandleRight`, `LeftExtends`, ...
 */
export type LeftRight<
  L = unknown,
  R = unknown
> = [kind: "LeftRight", left: L, right: R];

/**
 * **AsLeftRight**`<A,B>`
 *
 * Assigns two types into a `LeftRight` tuple.
 *
 * Note: in most cases you should prefer the use of `ToLeft` and `ToRight`
 * but in the case where both sides of the `LeftRight` tuple are being leveraged
 * this is a convenient way to set the value.
 */
export type AsLeftRight<A,B> = LeftRight<A,B>;

/**
 * **IsSingleSided**`<T>`
 *
 * Boolean utility which tests whether a `LeftRight` container has
 * a value only on the left or right sides but _not_ both.
 */
export type IsSingleSided<T extends LeftRight> = T extends [Defined, undefined]
? true
: T extends [undefined, Defined]
  ? true
  : false;

/**
 * **AsLeft**`<T>`
 *
 * Creates a `LeftRight` tuple with value on left.
 */
export type AsLeft<T> = LeftRight<T,null>;


/**
 * **IfLeft**`<T>`
 *
 * Checks that
 */
export type IfLeft<T extends LeftRight> = IsSingleSided<T> extends true
? T[left] extends Defined ? true : false
: never;

/**
 * **AsRight**`<T>`
 *
 * Creates a `LeftRight` tuple with value on right.
 */
export type AsRight<T> = LeftRight<null, T>;

/**
 * **AppendRight**`<TErr, TExisting>`
 *
 * Type utility to add to the right side of a `LeftRight` tuple.
 *
 * - if the right of `TExisting` is empty it will add `TErr` as the first element
 * of an array
 */
export type AppendRight<TErr, TExisting extends LeftRight> = TExisting[right] extends Tuple
? [...TExisting[right], TErr] : [TErr];

/**
 * **LeftExtends**`<TEval,TLeftRight>`
 *
 * Boolean utility which states whether the value of `TEval` _extends_
 * the _left_ value of `TLeftRight`
 */
export type LeftExtends<
  TEval,
  TLeftRight extends LeftRight
> = TEval extends TLeftRight[left] ? true : false;

/**
 * **LeftEquals**`<TEval,TLeftRight>`
 *
 * Boolean utility which states whether the value of `TEval` _equals_
 * the _left_ value of `TLeftRight`
 */
export type LeftEquals<
  TEval,
  TLeftRight extends LeftRight
> = IfEqual<TEval, TLeftRight[left], true, false>;

/**
 * **LeftIncludes**
 *
 * Boolean utility which validates that at least one of the strings segments
 * in `TEval` -- a string or tuple of strings -- is found in the string
 * value contained in the left side of `TLeftRight`.
 */
export type LeftIncludes<
  TEval,
  TLeftRight extends LeftRight
> = TLeftRight[left] extends string
? TEval extends string | readonly string[]
    ? Contains<TEval,TLeftRight[left]>
    : false
: false;

type Explicitness = "loose" | "tight";

/**
 * **LeftContains**
 *
 * Boolean utility which validates that the _left_ value of the `TLeftRight`
 * is a tuple and one of the elements _contains_ `TEval`.
 *
 * The definition of _contains_ is determined by the optional `TExplicitness` generic:
 * - it defaults to "loose" and in turns means that `TEval` must _extend_ an element
 * - if set to `tight` then it will perform an explicit equality
 * check on each element.
 *
 * **Related:** `LeftIncludes`
 */
export type LeftContains<
  TEval,
  TLeftRight extends LeftRight,
  TExplicitness extends Explicitness = "loose"
> = TLeftRight[left] extends Tuple
? TExplicitness extends "loose"
  ? Contains<TLeftRight[left], TEval>
  : NarrowlyContains<TLeftRight[left], TEval>
: false;


/**
 * **LeftExtends**`<TEval,TLeftRight>`
 *
 * Boolean utility which states whether the value of `TEval` _extends_
 * the _right_ value of `TLeftRight`
 */
export type RightExtends<
  TEval,
  TLeftRight extends LeftRight
> = TEval extends TLeftRight[right] ? true : false;

/**
 * **RightEquals**`<TEval,TLeftRight>`
 *
 * Boolean utility which states whether the value of `TEval` _equals_
 * the _right_ value of `TLeftRight`
 */
export type RightEquals<
  TEval,
  TLeftRight extends LeftRight
> = IfEqual<TEval, TLeftRight[right], true, false>;


/**
 * **RightIncludes**
 *
 * Boolean utility which validates that at least one of the strings segments
 * in `TEval` -- a string or tuple of strings -- is found in the string
 * value contained in the right side of `TLeftRight`.
 *
 * **Related:** `RightContains`
 */
export type RightIncludes<
  TEval,
  TLeftRight extends LeftRight
> = TLeftRight[right] extends string
? TEval extends string | readonly string[]
  ? Contains<TEval,TLeftRight[right]>
  : false
: false;

/**
 * **RightContains**
 *
 * Boolean utility which validates that the _right_ value of the `TLeftRight`
 * is a tuple and one of the elements _contains_ `TEval`.
 *
 * The definition of _contains_ is determined by the optional `TExplicitness` generic:
 * - it defaults to `loose` and in turns means that `TEval` must _extend_ an element
 * - if set to `tight` then it will perform an explicit equality
 * check.
 *
 * **Related:** `RightIncludes`
 */
export type RightContains<
  TEval,
  TLeftRight extends LeftRight,
  TExplicitness extends Explicitness = "loose"
> = TLeftRight[left] extends Tuple
? TExplicitness extends "loose"
  ? Contains<TLeftRight[left], TEval>
  : NarrowlyContains<TLeftRight[left], TEval>
: false;

export type LeftRight__Operations =
| "extends"
| "equals"
| "includes"
| "contains";


/**
 * **WhereLeft**`<TEval,TOp,TLeftRight,[IF],[ELSE]>`
 *
 * A branching utility which branches based on:
 *  - some type `TEval` when using some operation `TOp`
 *  - evaluates to `true` for `TLeftRight[left]`
 *
 * #### Operations
 * - operations are _extends_, _equals_, _includes_, and _contains_
 * - _includes_ looks for sub-strings, whereas _contains_ looks for an element of a tuple
 *
 * #### Defaults
 * - the `IF` type defaults to either `TEval` or -- where possible -- a narrowed version based on the intersection of the two types
 * - the `ELSE` defaults to `ErrorCondition<"conditional-failure">`
 */
export type WhereLeft<
  TEval,
  TOp extends LeftRight__Operations,
  TLeftRight extends LeftRight,
  IF = TEval & TLeftRight[left],
  ELSE = AsError<[
    "conditional-failure-left",
    Concat<[
      "While using the '",
      TOp,
      "' operation to compare to the LEFT value"
    ]>,
    { library: "inferred-types"; utility: "IfLeft" }
  ]>
> =
TOp extends "extends"
  ? LeftExtends<TEval,TLeftRight> extends true ? IF : ELSE
: TOp extends "equals"
  ? LeftEquals<TEval, TLeftRight> extends true ? IF : ELSE
: TOp extends "includes"
  ? LeftIncludes<TEval, TLeftRight> extends true ? IF : ELSE
: TOp extends "contains"
  ? LeftContains<TEval, TLeftRight> extends true ? IF : ELSE
: never;

