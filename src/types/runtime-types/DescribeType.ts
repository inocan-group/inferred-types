/* eslint-disable no-use-before-define */

import { 
  AnyFunction, 
  AnyObject, 
  IsStringLiteral, 
  IsEqual,
  IsNumericLiteral,
  IsLiteral,
  IsUnion,
  If,
  UnionToTuple,
  Join,
  IsTuple,
  IsNever,
  IsTrue,
  Surround,
  IsObjectLiteral,
  Keys,
  AfterFirst,
  First,
  AsString,
  IsBooleanLiteral,
  Dictionary
} from "src/types/index";


type DescribeUnion<
  T extends readonly unknown[]
> = Join<{
  [K in keyof T]: Describe<T[K]>
}, " | ">;

type Describe<
  T
> = If<
  IsNever<T>, 
  "never",
  [T] extends [string] ? If<IsStringLiteral<T>,`'${T}'`,"string">
    : [T] extends [boolean] 
    ? If<IsTrue<T>, "true", If<IsBooleanLiteral<T>, "false", "boolean">>
    : IsEqual<T,null> extends true  ? "null"
    : IsEqual<T,undefined> extends true  ? "undefined"
    : IsEqual<T, unknown> extends true ? "unknown"
    : [T] extends [number] ? If<IsNumericLiteral<T>, `${T}`, "number">
    : [T] extends [AnyFunction] ? "function"
    : [T] extends [AnyObject] ? If<IsLiteral<T>, "{ ... }", "object">
    : [T] extends [symbol] ? "symbol" 
    : "non-identified-type"
>;

type ProcessUnionArray<
  T extends readonly unknown[]
> = `(${DescribeUnion<T>})[]`

type HandleWideArray<
  T extends unknown[]
> = T extends (infer U)[]
? IsUnion<U> extends true
  ? ProcessUnionArray<UnionToTuple<U>>
  : U extends string ? "string[]"
  : U extends number ? "number[]"
  : U extends boolean ? "boolean[]"
  : "unknown[]"
: never;


type DescribeArray<
  T extends unknown[]
> = IsTuple<T> extends true
? Surround<
    Join<{
      [K in keyof T]: Describe<T[K]>
    }, ", ">,
    "[", "]"
  >
: HandleWideArray<T>;

type ObjKey<T extends string | symbol | number> = T extends string
? T
: T extends number  
? AsString<T>
: "symbol";

type HandleObjLiteral<
  TObj extends object,
  TKeys extends readonly (keyof TObj)[],
  TResult extends string = ""
> = [] extends TKeys
? `{ ${TResult} }`
: HandleObjLiteral<
    TObj,
    AfterFirst<TKeys>,
    TResult extends ""
    ? `${ObjKey<First<TKeys>>}: ${AsString<Describe<TObj[First<TKeys>]>>}`
    : `${TResult}; ${ObjKey<First<TKeys>>}: ${AsString<Describe<TObj[First<TKeys>]>>}`
  >;

type RecordKey<
  K extends PropertyKey
> = IsUnion<K> extends true
? Join<UnionToTuple<K>, "|">
: Describe<K>;

type RecordValue<T> = AsString<Describe<T>>;

type BuildRecord<
  K extends PropertyKey,
  V
> = RecordKey<K> extends string
? RecordValue<V> extends string
? `Record<${RecordKey<K>}, ${RecordValue<V>}>`
: never
: never;


type DescribeObj<
  T extends object
> = IsObjectLiteral<T> extends true
  ? HandleObjLiteral<T, Keys<T> extends readonly (keyof T)[] ? Keys<T> : never>
  : IsEqual<T, object> extends true ? "object"
  : IsEqual<T, Dictionary> extends true ? "Record<string | symbol, unknown>"
  : [T] extends [Record<infer K, infer V>]
      ? BuildRecord<K,V>
    : "object";

/**
 * **DescribeType**`<T>`
 * 
 * Describes the type of `T`.
 * 
 * - this includes being able to identify "runtime types" like those
 * defined from the `type()` runtime utility in this library as the
 * underlying type
 */
export type DescribeType<T> = IsNever<T> extends true
  ? "never"
  : IsUnion<T> extends true
    ? DescribeUnion<UnionToTuple<T>>
  : T extends unknown[]
      ? DescribeArray<T>
  : T extends object
    ? DescribeObj<T>
    : Describe<T>;

