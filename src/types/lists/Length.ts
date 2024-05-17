/* eslint-disable @typescript-eslint/ban-types */
import type {  
  AsString, 
  Container, 
  ExpandRecursively, 
  If, 
  IfNever, 
  IsEqual, 
  IsObjectLiteral, 
  IsWideType, 
  Dictionary, 
  NotEqual, 
  ObjectKey, 
  Or, 
  RemoveIndexKeys, 
  StrLen,  
  UnionToTuple 
} from "src/types/index";

type _Keys<
T extends object
> = UnionToTuple<keyof RemoveIndexKeys<T>>;

type ProcessString<T extends string> = If<
  IsEqual<T,string>,
  number,
  StrLen<T> extends number
  ? StrLen<T>
  : never
>

type ProcessTuple<T extends readonly unknown[]> = T["length"] extends number
? T["length"]
: never;


/**
 * Utility type which returns the length of:
 * 
 * - an _array_ (provides the number of elements)
 * - an _object_ (provides the number of keys)
 * - a _string_ (provides the number of chars)
 * - a _number_ (it will provide the number of digits)
 * 
 * ```ts
 * type Three = Length<[ "a", "b", "c" ]>;
 * ```
 */
export type Length<
  T extends Container | string | number
  > = T extends number
? number extends T
  ? number
  : ProcessString<AsString<T>>
: T extends string
  ? ProcessString<T>
  : T extends readonly unknown[]
    ? ProcessTuple<T>
    : T extends object
    ? If<
        Or<[
          IsEqual<T, string[]>,
          IsEqual<T, number[]>,
          IsEqual<T, boolean[]>,
          IsEqual<T, unknown[]>,
          IsEqual<keyof T, string | symbol>,
          IsEqual<keyof T, string>,
        ]>,
        number,
        _Keys<T> extends readonly ObjectKey[]
          ? _Keys<T>["length"]
          : never
      >
      
    : never;

