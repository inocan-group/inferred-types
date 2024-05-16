/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { 
  AfterFirst, 
  AnyFunction, 
  EmptyObject, 
  ExpandRecursively, 
  First, 
  FnProps, 
  If, 
  IsObjectLiteral, 
  IsUnion, 
  KV, 
  Keys, 
  ObjectKey, 
  RemoveFnProps, 
  RemoveIndexKeys, 
  Scalar, 
  TupleToUnion, 
  UnionToTuple 
} from "src/types/index";

type GetKeys<
  T extends AnyFunction
> = FnProps<T> extends KV
? Keys<FnProps<T>> extends readonly ObjectKey[]
  ? Keys<FnProps<T>> extends readonly (keyof FnProps<T>)[]
    ? Keys<FnProps<T>>
    : never
  : never
: never;


/**
 * **WidenScalar**`<T>`
 * 
 * Widens any _scalar_ type `T`.
 */
export type WidenScalar<T extends Scalar> = T extends string
? string
: T extends number
? number
: T extends boolean
? boolean 
: T extends symbol
? symbol
: T extends null
? null
: never;


type Process<T> = T extends Scalar
? WidenScalar<T>
: T extends readonly string[]
? string[]
: T extends readonly number[]
? number[]
: T extends readonly boolean[]
? boolean[]
: T extends AnyFunction
? GetKeys<T>["length"] extends 0
  ? RemoveFnProps<T>
  : RemoveFnProps<T> & ExpandRecursively<  WidenObj<FnProps<T>, GetKeys<T>> >
    
: T;

type WidenObj<
  T extends object,
  TKeys extends readonly (keyof T)[],
  TResults extends KV = EmptyObject
> = [] extends TKeys
  ? TResults
  : WidenObj<
      T,
      AfterFirst<TKeys>,
      TResults & 
      Record<
        First<TKeys>,  
        If<
          IsObjectLiteral<T[First<TKeys>]>,
          Record<keyof T[First<TKeys>],unknown>,
          Process<T[First<TKeys>]>
        >
      >
    >


export type WidenTuple<
  T extends readonly unknown[]
> = {
  [K in keyof T]: Process<T[K]>
};




/**
 * **WidenUnion**<T>
 * 
 * Widens all the elements in the union type.
 */
export type WidenUnion<T> = TupleToUnion<WidenTuple<UnionToTuple<T>>>

export type WidenLiteral<
  T 
> =  T extends Scalar
  ? WidenScalar<T>
  : IsUnion<T> extends true
  ? WidenUnion<T>
  : T extends readonly unknown[]
  ? WidenTuple<T>
  : never;

/**
 * **Widen**<T>
 * 
 * Makes all efforts to _widen_ the type found (though 
 * not to the point it is "unknown" or "any").
 */
export type Widen<T> = [IsUnion<T>] extends [true]
  ? WidenUnion<T>
  : T extends readonly unknown[]
  ? WidenTuple<T>
  : T extends object
  ? [IsObjectLiteral<T>] extends [true]
    ? Keys<T> extends readonly (keyof T)[]
      ? ExpandRecursively<WidenObj<T, Keys<T>>>
      : never
    
    : RemoveIndexKeys<T>
  : T extends Scalar
    ? WidenScalar<T>
    : Process<T>;


