/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  IsLiteral, 
  AsString, 
  Mutable, 
  Chars, 
  LowerAlphaChar, 
  UpperAlphaChar, 
  IsUnion, 
  UnionToTuple, 
  IsNever, 
  IsEqual, 
  If, 
  First as F, 
  NumericChar, 
  Extends,
  ObjectKey, 
  Join
} from "src/types/index";
import { 
  HASH_TABLE_ALPHA_LOWER, 
  HASH_TABLE_ALPHA_UPPER, 
  HASH_TABLE_DIGIT, 
  HASH_TABLE_OTHER, 
  HASH_TABLE_SPECIAL, 
  HASH_TABLE_WIDE
} from "src/constants/index";


type Wide = Mutable<typeof HASH_TABLE_WIDE>;
type Lower = Mutable<typeof HASH_TABLE_ALPHA_LOWER>;
type Upper = Mutable<typeof HASH_TABLE_ALPHA_UPPER>;
type Num = Mutable<typeof HASH_TABLE_DIGIT>;
type Special = Mutable<typeof HASH_TABLE_SPECIAL>;

type Literal<T extends string> = T extends LowerAlphaChar
? T extends keyof Lower
  ? Lower[T]
  : never
: T extends UpperAlphaChar
  ? T extends keyof Upper
    ? Upper[T]
    : never
: T extends NumericChar
  ? [T] extends [keyof Num]
    ? Num[T]
    : never
: T extends keyof Special
  ? Special[T]
  : Mutable<typeof HASH_TABLE_OTHER>;

type HashLiteral<
  T extends readonly string[]
> = T extends readonly [
  infer First extends string, 
  infer Second extends string, 
  ...readonly unknown[],
   infer Last extends string]
? `${Literal<AsString<First>>}${Literal<AsString<Last>>}${Literal<AsString<Second>>}`
: T extends readonly [
  infer First extends string, 
  infer Second extends string
] ? `${Literal<AsString<First>>}${Literal<AsString<Second>>}`
: T extends readonly [
  infer First extends string
] ? `${Literal<AsString<First>>}`
: never;

type ArrayType<T extends any[]> = [IsNever<F<T>>] extends [true]
  ? `${Wide["record"]}${Wide["never"]}`
  : [F<T>] extends [string]
  ? `${Wide["record"]}${Wide["string"]}`
  : [F<T>] extends [number]
  ? `${Wide["record"]}${Wide["number"]}`
  : [F<T>] extends [unknown]
  ? `${Wide["record"]}${Wide["unknown"]}]`
  : Mutable<typeof HASH_TABLE_OTHER>;


type HashWide<T> = [T] extends [string]
  ? Wide["string"]
  : [T] extends [number]
  ? Wide["number"]
  : [T] extends [boolean]
  ? Wide["boolean"]
  : [T] extends [never]
  ? Wide["never"]
  : [T] extends [null]
  ? Wide["null"]
  : [T] extends [any[]]
  ? ArrayType<T>
  : [Extends<T, symbol>] extends [true]
  ? Wide["symbol"]
  : [IsEqual<T, unknown>] extends [true]
  ? Wide["unknown"]
  : [IsEqual<T, undefined>] extends [true]
  ? Wide["undefined"]
  : [T] extends [Record<infer K extends ObjectKey, infer V>]
    ? [IsUnion<K>] extends [true]
      ? `${Wide["record"]}${Wide["union"]}${HashWide<V>}`
      : `${Wide["record"]}${HashWide<K>}${HashWide<V>}`
  : "";

type Iterate<
  T extends readonly unknown[]
> = {
  [K in keyof T]: IsLiteral<T[K]> extends true
    ? HashLiteral<Chars<AsString<T[K]>>>
    : HashWide<T[K]>;
};

export type Hash<T> = If<
    IsUnion<T>,
    [UnionToTuple<T>] extends [readonly unknown[]]
      ? Iterate<UnionToTuple<T>>
      : never,
    [T] extends [readonly unknown[]]
      ? Iterate<T>
      : [IsLiteral<T>] extends [true]
        ? HashLiteral<Chars<AsString<T>>>
        : HashWide<T>
>

