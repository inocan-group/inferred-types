import { AfterFirst } from "../lists";
import { First } from "../lists/First";
import { Narrowable } from "../Narrowable";
import { And } from "./And";


/**
 * **DoesExtend**`<TValue, TExtends>`
 *
 * Boolean type utility which returns `true` if `TValue` _extends_ `TExtends`.
 */
export type DoesExtend<
  TValue extends Narrowable, 
  TExtends extends Narrowable
> = TValue extends TExtends
  ? true
  : false;

/**
 * **IfExtends**`<TValue,TExtends,IF,ELSE>`
 *
 * Branching type utility which returns type `IF` when `E` _extends_ `T`; otherwise
 * it will return the type `ELSE`.
 */
export type IfExtends<
  TValue extends Narrowable,
  TExtends extends Narrowable,
  IF extends Narrowable = true,
  ELSE extends Narrowable = false
> = DoesExtend<TValue, TExtends> extends true ? IF : ELSE;

type ExtendEveryAcc<
  TValue extends Narrowable,
  TList extends readonly any[],
  Processed extends readonly any[] = []
> = TList extends [infer First, ...infer Rest]
  ? First extends TValue
    ? ExtendEveryAcc<TValue, Rest, readonly [...Processed, true]>
    : ExtendEveryAcc<TValue, Rest, readonly [...Processed, false]>
  : And<Processed>;


/**
 * **ExtendsEvery**`<TValue, TList>`
 * 
 * A type utility which provides a boolean response on whether the value `V`
 * extends all of the properties in the array of `T`
 */
export type ExtendsEvery<
  TValue extends Narrowable,
  TList extends readonly any[],
> = ExtendEveryAcc<TValue, TList>;

/**
 * **ExtendsSome**`<TValue,TExtends[]>`
 * 
 * A type utility which provides a boolean response on whether the value `V`
 * extends _any_ of the properties in the array of `T`
 */
export type ExtendsSome<
  TValue extends Narrowable,
  TExtendsSome extends readonly any[]
> = [] extends TExtendsSome
  ? false
  : TValue extends First<TExtendsSome>
    ? true // short circuit with true
    : ExtendsSome<TValue, AfterFirst<TExtendsSome>>;


/**
 * **IfExtendsEvery**`<V,T,IF,ELSE>`
 * 
 * Type utility which converts the type based on whether `V` _extends_
 * all the values in `T`.
 */
export type IfExtendsEvery<
  V extends Narrowable,
  TList extends readonly any[],
  IF extends Narrowable,
  ELSE extends Narrowable
> = ExtendsEvery<V,TList> extends true ? IF : ELSE;


/**
 * **IfExtendsSome**`<TList,TValue,IF,ELSE>`
 * 
 * Type utility which converts the type based on whether elements of `TList`
 * extend `TValue`.
 */
export type IfExtendsSome<
TValue extends Narrowable,
TList extends readonly any[],
IF extends Narrowable,
ELSE extends Narrowable
> = ExtendsSome<TValue,TList> extends true ? IF : ELSE;
