import { 
  IfArray,  
  IfLiteral, 
  IfScalar, 
  IsArray, 
  IsLiteral,  
  IfAnd 
} from "../boolean-logic";
import { AnyObject, IfObject } from "../boolean-logic/object";
import { FromMaybeRef } from "../dictionary/FromMaybeRef";
import { Get } from "../dictionary/Get";
import { Keys } from "../dictionary/Keys";
import { AfterFirst, First, RemoveEquals } from "../lists";
import { Flatten } from "../lists/Flatten";
import { Retain } from "../lists/Retain";
import { Narrowable } from "../literals/Narrowable";
import { TupleToUnion } from "../type-conversion";
import { ToString } from "../type-conversion/ToString";
import { EmptyString } from "./EmptyString";
import { Prepend } from "./Prepend";
import { PrependAll } from "./PrependAll";

type SubIndexes<
  TList extends readonly unknown[],
  TOffset extends string = ""
> =  Flatten<{
    [K in keyof TList]: RemoveEquals<[
      // the first key is always an suggestion
      K, 
      // based on T[K] value
      IfAnd<
        [ 
          IsArray<FromMaybeRef<TList[K]>>, 
          IsLiteral<FromMaybeRef<TList[K]>> 
        ],
        // literal array
        FromMaybeRef<TList[K]> extends readonly any[] | AnyObject
        ? Keys<FromMaybeRef<TList[K]>> extends readonly string[]
          ? PrependAll< 
              Keys<FromMaybeRef<TList[K]>>, 
              `${TOffset}${ToString<K>}.` 
            >
          : never
        : never,
        // non-literal values for T[K]
        IfArray<
          FromMaybeRef<TList[K]>, 
          `${TOffset}${ToString<K>}.${number}`, // we just know any array will be indexed by a number
          IfObject<
            FromMaybeRef<TList[K]>,
            `${TOffset}${string}`,
            EmptyString // other values can't be references via dotpath
          >
        >
      >
    ], EmptyString>
}>;

type Val<
  TValue extends readonly any[] | AnyObject,
  TKeys extends readonly (keyof TValue & string)[]
> = Get<TValue & AnyObject, First<TKeys>>;

type Suggestions<TValue, TOffset extends string> = TValue extends number[]
  ? [ Prepend<`${number}`, TOffset> ]
: TValue extends readonly unknown[]
  ? Keys<TValue> extends readonly unknown[]
    ? PrependAll<Retain<Keys<TValue>, string>, TOffset>
    : [ Prepend<`${number}`, TOffset> ]
  : TValue extends AnyObject
    ? IfLiteral<
        TValue, 
        PrependAll<Retain<Keys<TValue>, string>, TOffset>,
        [ Prepend<`${string}`, TOffset> ]
      >
    : [];

type PrimaryIndexes<
  TValue extends readonly unknown[] | AnyObject,
  TKeys extends readonly (keyof TValue & string)[],
  TResults extends string[] = []
> = [] extends TKeys
  ? TResults
  : PrimaryIndexes<
      TValue,
      AfterFirst<TKeys>,
      // RESULTS
      [ 
        ...TResults,
        First<TKeys>,
        ...Suggestions<Val<TValue,TKeys>, `${First<TKeys>}.`>
      ]
    >;


/**
 * **DotPathFor**`<TValue>`
 * 
 * Provides _suggestions_ for valid dotpath's on a given value.
 */
export type DotPathFor<
  TValue extends Narrowable | readonly unknown[],
> = IfScalar<
  FromMaybeRef<TValue>,
  // if the target is a scalar value, only valid path is null
  null,
  // non-scalar values 
  TupleToUnion<
    FromMaybeRef<TValue> extends AnyObject
    ? IfLiteral<
        FromMaybeRef<TValue>,
        PrimaryIndexes<FromMaybeRef<TValue>, Keys<FromMaybeRef<TValue>>>,
        [string]
      >

    : FromMaybeRef<TValue> extends readonly unknown[]
      ? SubIndexes<FromMaybeRef<TValue>> extends readonly unknown[]
        ? Flatten<SubIndexes<FromMaybeRef<TValue>>>
        : SubIndexes<FromMaybeRef<TValue>>
    : [string]
  >
>;
