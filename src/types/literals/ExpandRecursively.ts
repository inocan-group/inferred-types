/* eslint-disable no-use-before-define */
import { AfterFirst, AnyFunction, AsLiteralFn, AsNarrowingFn, Decrement, Dictionary, First, FnProps, IsNarrowingFn, Tuple, TypedFunction } from "src/types/index";

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

type ExpandParameters<
  TFn extends TypedFunction,
  TParams extends readonly unknown[],
  TResults extends readonly unknown[] = []
> = [] extends TParams
? IsNarrowingFn<TFn> extends true
  ? AsNarrowingFn<TResults,ReturnType<TFn>,ExpandDictionary<FnProps<TFn>>>
  : AsLiteralFn<TResults,ReturnType<TFn>,ExpandDictionary<FnProps<TFn>>>
: ExpandParameters<
    TFn,
    AfterFirst<TParams>,
    [
      ...TResults,
      First<TParams> extends Dictionary
        ? ExpandDictionary<First<TParams>>
        : First<TParams>
    ]
  >

/**
 * Recursively goes over an object based structure and tries to reduce
 * it down to just a simple key/value type.
 */
export type ExpandRecursively<T> = T extends Dictionary
  ? { [K in keyof T]: T[K] extends AnyFunction
      ? T[K] extends TypedFunction
        ? ExpandParameters<T[K], Parameters<T[K]>>
        : T[K]
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
