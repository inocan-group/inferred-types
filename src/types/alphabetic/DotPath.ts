import {  AnyObject,  Or } from "../boolean-logic";
import { And } from "../boolean-logic/And";
import { EndsWith } from "../boolean-logic/EndsWith";
import { StartsWith } from "../boolean-logic/StartsWith";
import { Includes } from "../boolean-logic/string";
import { MaybeRef } from "../dictionary/MaybeRef";
import { Keys } from "../Keys";
import { AfterFirst, Length } from "../lists";
import { First } from "../lists/First";
import { Split } from "../lists/Split";
import { Narrowable } from "../Narrowable";
import { Scalar } from "../Scalar";
import { TupleToUnion } from "../type-conversion";
import { AlphaNumericChar } from "./alpha-characters";

export type DotPathChar = AlphaNumericChar | "_" | "-";

type Segments<T extends string> = Split<T, ".">;

type ValidDotChars<T extends string> = T extends `${DotPathChar}${infer REST}`
  ? ValidDotChars<REST>
  : T extends ""
    ? true
    : false;

type ValidateSegments<
  Segments extends readonly string[],
  Validated extends readonly boolean[] = readonly []
> = [] extends Segments
  ? And<Validated>
  : ValidDotChars<First<Segments>> extends true
    ? ValidateSegments<AfterFirst<Segments>, readonly [...Validated, true]>
    : ValidateSegments<AfterFirst<Segments>, readonly [...Validated, false]>;


/**
 * **DotPath**`<T>`
 * 
 * Forces a string to be a "dot path" which means that:
 * 
 * -  alphanumeric characters and a few symbols [`_`, `-`,  ], 
 * segmented by the `.` character.
 * - leading and trailing `.` characters are **not** allowed
 */
export type DotPath<T extends string> = Or<[
  StartsWith<T, ".">,
  EndsWith<T, ".">,
  Includes<T, "..">
]> extends true 
  ? never
  : ValidateSegments<Segments<T>>;

/**
 * **DotPathFor**`<TValue>`
 * 
 * Provides an appropriate "DotPath" for any given value.
 */
export type DotPathFor<
  TValue extends Narrowable,
> = MaybeRef<TValue> extends AnyObject
  ? Length<Keys<MaybeRef<TValue>>> extends 0
    ? string | null
    : `${TupleToUnion<Keys<MaybeRef<TValue>>>}${`.${string}` | ""}` | null
  : MaybeRef<TValue> extends Scalar
    ? null // you can't traverse any further
    : MaybeRef<TValue> extends any[] | readonly any[]
      ? `${number}${`.${string}` | ""}` // numeric index
      : never;


