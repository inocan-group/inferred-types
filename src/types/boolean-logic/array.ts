import { IsEqual } from "./equivalency";
import { AfterFirst, First } from "../lists";
import { Narrowable } from "../literals/Narrowable";
import { AnyFunction } from "../functions/function-types";

/**
 * **IsArray**
 * 
 * Boolean utility which tests for whether `T` is an array (
 * both a mutable array or a readonly array)
 */
export type IsArray<T> = [T] extends [any[]] 
  ? true 
  : [T] extends [readonly any[]] 
    ? true 
    : false;


export type IsReadonlyArray<T> = T extends readonly any[] ? true : false;

/**
 * **IfArray**`<T, IF, ELSE>`
 *
 * Type utility which convert to type `IF` or `ELSE` based on whether `T` is an array
 */
export type IfArray<
  T extends Narrowable,
  IF extends Narrowable,
  ELSE extends Narrowable
> = IsArray<T> extends true ? IF : ELSE;

/**
 * **IfArray**`<T, IF, ELSE>`
 *
 * Type utility which convert to type `IF` or `ELSE` based on whether `T` is a readonly array
 */
export type IfReadonlyArray<
  T extends Narrowable,
  IF extends Narrowable,
  ELSE extends Narrowable
> = IsReadonlyArray<T> extends true ? IF : ELSE;

/**
 * **Contains**`<TList,TContains>`
 *
 * Type utility which checks whether a type `TContains` exists within 
 * an array `TList`. Result is `true` if any element in the list _extends_
 * 
 * **Related:** `NarrowlyContains`
 */
export type Contains<
  TList extends readonly any[],
  TContains extends Narrowable, 
> = [] extends TList
  ? false
  : First<TList> extends TContains
  ? true
  : [] extends AfterFirst<TList>
  ? false
  : Contains<AfterFirst<TList>, TContains>;

/**
 * **IfContains**`<TList,TContains,IF,ELSE>`
 *
 * Branching utility which check 
 * 
 * **Related:** `NarrowlyContains`
 */
export type IfContains<
  TList extends readonly any[],
  TContains extends Narrowable,
  IF extends Narrowable,
  ELSE extends Narrowable
> = Contains<TList, TContains> extends true
  ? IF
  : ELSE;

/**
 * **NarrowlyContains**`<TList, TContains>`
 *
 * Type utility which checks whether a type `T` exists within an array `A`. Result is
 * `true` if `T` _extends_ any element in `A` making it match widely against `A`. If you
 * prefer a wider match you can use `Contains<T,A>` instead.
 */
export type NarrowlyContains<
  TList extends readonly any[],
  TContains extends Narrowable, 
> = IsEqual<
  First<TList>,
  TContains
> extends true
  ? true
  : [] extends AfterFirst<TList>
  ? false
  : NarrowlyContains<AfterFirst<TList>, TContains>;


/**
 * **ReturnValues**`<TArray>`
 * 
 * Reduces an array of types to those which are functions and then evaluates
 * these functions return values as narrowly as possible.
 * ```ts
 * // [true, "blue"]
 * type T = ReturnValues<[true, false, () => true, () => "blue"]
 * ```
 */
export type ReturnValues<
  TArray extends readonly any[] | any[], 
  TResults extends readonly  any[] = []> = //
  [] extends TArray
    ? TResults
    : First<TArray> extends AnyFunction
      ? ReturnValues<AfterFirst<TArray>, [...TResults, ReturnType<First<TArray>>]>
      : ReturnValues<AfterFirst<TArray>, TResults>;



