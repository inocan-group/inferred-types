import type { AfterFirst, AnyFunction, AsLiteralFn, AsNarrowingFn, Decrement, Dictionary, First, FnKeyValue, IsNarrowingFn, IsUnion, Tuple, TupleToUnion, TypedFunction, UnionToTuple } from "inferred-types/types";

type _ExpandTuple<
    TLength extends number,
    TContent extends Tuple,
    TTuple extends Tuple = [],
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
    TResults extends readonly unknown[] = [],
> = [] extends TParams
    ? IsNarrowingFn<TFn> extends true
        ? AsNarrowingFn<TResults, ReturnType<TFn>, ExpandDictionary<FnKeyValue<TFn>>>
        : AsLiteralFn<TResults, ReturnType<TFn>, ExpandDictionary<FnKeyValue<TFn>>>
    : ExpandParameters<
        TFn,
        AfterFirst<TParams>,
        [
            ...TResults,
            First<TParams> extends Dictionary
                ? ExpandDictionary<First<TParams>>
                : First<TParams>,
        ]
    >;

export type ExpandTuple<T> = T extends Tuple
    ? _ExpandTuple<T["length"], T>
    : T;

export type ExpandUnion<T> = IsUnion<T> extends true
    ? TupleToUnion<
        ExpandTuple<UnionToTuple<T>>
    >
    : T
  ;

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

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
