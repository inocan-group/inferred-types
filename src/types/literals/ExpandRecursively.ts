import { AfterFirst, AnyFunction, Decrement, Dictionary, First, IsTuple, Tuple } from "src/types/index";

type _ExpandTuple<
  TLength extends number,
  TContent extends Tuple,
  TTuple extends Tuple = []
> = TLength extends 0
  ? Readonly<TTuple>
  : _ExpandTuple<
      Decrement<TLength>,
      AfterFirst<TContent>,
      [...TTuple, First<TContent>]
  >;

/**
 * Recursively goes over an object based structure and tries to reduce
 * it down to just a simple key/value type.
 */
export type ExpandRecursively<T> = T extends readonly unknown[]
? IsTuple<T> extends true
  ? T
  : T
: T extends object
  ? { [K in keyof T]: T[K] extends AnyFunction
      ? T[K]
      : ExpandRecursively<T[K]> 
    }
  : T;

/**
 * Recursively goes over an object based structure and tries to reduce
 * it down to just a simple key/value type.
 */
export type ExpandDictionary<T> = T extends Dictionary
  ? { [K in keyof T]: T[K] extends AnyFunction
      ? T[K]
      : ExpandRecursively<T[K]> 
    }
  : T;
