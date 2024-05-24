/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  AnyFunction,
  TypedFunction,
  IsLiteral, 
  AsString, 
  IsUnion, 
  UnionToTuple, 
  First, 
  FirstChar,
  IsBoolean,
  IsUndefined,
  IsString,
  IsNull,
  IsNever,
  IsNumber,
  IsTrue,
  IsFalse,
  Dictionary,
  Values,
  Last,
  Tuple,
  As,
  Join,
} from "src/types/index";

type HashWide<T> = IsUnion<T> extends true
? `u${UnionToTuple<T>["length"]}`
: IsString<T> extends true
? "1"
: IsNumber<T> extends true
? "2"
: IsBoolean<T> extends true
? "3"
: IsNull<T> extends true
? "4"
: IsUndefined<T> extends true
? "5"
: IsNever<T> extends true
? "6"
: T extends AnyFunction
  ? T extends TypedFunction
    ? `ff`
    : "f"
: T extends Dictionary
  ? T extends Record<any, infer V>
    ? `o${HashWide<V>}`
    : "o"
: T extends Set<any>
  ? T extends Set<infer V>
    ? `s${HashWide<V>}`
    : "s"
: T extends Map<any,any>
  ? T extends Map<any, infer V>
    ? `m${HashWide<V>}`
    : "m"
: T extends WeakMap<any,any>
  ? T extends WeakMap<object, infer V>
    ? `wm${HashWide<V>}`
    : "wm"
: "u";

type FirstAndLast<
  T extends readonly unknown[]
> = `${Hash<First<T>>}${Hash<Last<T>>}`;


type HashLiteral<
  T
> = [IsString<T>] extends [true]
? FirstChar<AsString<T>>
: [IsNumber<T>] extends [true]
? T
: [IsTrue<T>] extends [true]
? 1
: [IsFalse<T>] extends [true]
? 0
: [T] extends [Dictionary]
? FirstAndLast<As<Values<T>, Tuple>>
: [T] extends [Tuple]
? FirstAndLast<As<T,Tuple>>
: never;

type Iterate<
  T extends readonly unknown[]
> = {
  [K in keyof T]: IsLiteral<T[K]> extends true
    ? HashLiteral<T[K]>
    : HashWide<T[K]>;
};

/**
 * **Hash**`<T>`
 * 
 * If `T` is a _union type_ or a tuple then
 * the items will be iterated over and then
 * joined together.
 */
export type Hash<T> = IsUnion<T> extends true
? Join<Iterate<UnionToTuple<T>>>
: T extends readonly unknown[]
? Join<Iterate<T>>
: IsLiteral<T> extends true 
  ? HashLiteral<T>
  : HashWide<T>;

