import type {
    AfterFirst,
    AnyFunction,
    AsLiteralFn,
    AsNarrowingFn,
    Container,
    Dictionary,
    EmptyObject,
    ExpandDictionary,
    ExpandRecursively,
    First,
    FnKeyValue,
    IsLiteralLike,
    IsLiteralUnion,
    IsNarrowingFn,
    IsNonEmptyContainer,
    IsObjectLiteral,
    IsUnion,
    Keys,
    LiteralFn,
    Mutable,
    Scalar,
    StringKeys,
    TypedFunction,
    UnionToTuple,
} from "inferred-types/types";
import type { OnlyFnProps } from "types/functions/OnlyFnProps";

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
                    : T extends undefined
                        ? undefined
                        : never;

type Process<T> = T extends Scalar
    ? WidenScalar<T>
    : T extends AnyFunction
        ? T extends TypedFunction
            ? WidenFunction<
                IsNarrowingFn<T>,
                Parameters<T>,
                ReturnType<T>,
                ExpandDictionary<FnKeyValue<T>>
            >
            : Function
        : T extends readonly unknown[]
            ? WidenTuple<T>
            : T extends Dictionary
                ? WidenObj<T, StringKeys<T>>
                : T;

type WidenObj<
    T extends Dictionary,
    TKeys extends readonly (keyof T)[],
    TResults extends Dictionary = EmptyObject,
> = [] extends TKeys
    ? TResults
    : WidenObj<
        T,
        AfterFirst<TKeys>,
        TResults
        & Record<
            First<TKeys>,
            T[First<TKeys>] extends AnyFunction
                ? WidenFunction<
                    IsNarrowingFn<T[First<TKeys>]>,
                    Parameters<T[First<TKeys>]>,
                    ReturnType<T[First<TKeys>]>,
                    ExpandDictionary<FnKeyValue<T[First<TKeys>]>>
                >
                : IsLiteralLike<T[First<TKeys>]> extends true
                    ? WidenLiteral<T[First<TKeys>]>
                    : Process<T[First<TKeys>]>
        >
    >;

export type WidenTuple<
    T extends readonly unknown[],
> = {
    [K in keyof T]: IsLiteralLike<T[K]> extends true
        ? WidenLiteral<T[K]>
        : Process<T[K]>
};

type WidenFnParams<
    T extends readonly unknown[],
> = {
    [K in keyof T]: IsLiteralLike<T[K]> extends true
        ? WidenLiteral<T[K]>
        : IsLiteralUnion<T[K]> extends true
            ? WidenUnion<T[K]>
            : T[K]
};

/**
 * **WidenUnion**<T>
 *
 * Widens all the elements in the union type.
 */
export type WidenUnion<T> = WidenTuple<UnionToTuple<T>>[number];

export type WidenLiteral<
    T,
> = T extends Scalar
    ? WidenScalar<T>
    : IsUnion<T> extends true
        ? WidenUnion<T>
        : T extends readonly unknown[]
            ? WidenTuple<T>
            : T extends Dictionary
                ? WidenObj<T, StringKeys<T>>
                : never;

type WidenFnProps<
    TObj extends Dictionary,
    TKeys extends readonly unknown[],
    TResult extends Dictionary = EmptyObject,
> = [] extends TKeys
    ? ExpandDictionary<TResult>
    : WidenFnProps<
        TObj,
        AfterFirst<TKeys>,
        First<TKeys> extends keyof TObj
            ? (
      TResult
      & Record<
          First<TKeys>,
          TObj[First<TKeys>] extends Scalar
              ? WidenScalar<TObj[First<TKeys>]>
              : TObj[First<TKeys>]
      >
            )
            : TResult
    >;

// Helper to determine the return type for narrowing functions
type DetermineNarrowingReturn<TParams, TReturn>
    = TParams extends readonly [infer P]
        ? P extends "Bob" | "Nancy"
            ? unknown // Union constraint gets unknown return
            : P extends string
                ? string // String constraint gets string return
                : Widen<TReturn>
        : Widen<TReturn>;

type ReturnFor<F, A>
  = F extends (a: A, ...r: any[]) => infer R ? R : never;

export type WidenFn<
    TFn extends TypedFunction
> = {
    narrowing: IsNarrowingFn<TFn>;
    literal: LiteralFn<TFn>;
    parameters: Parameters<TFn>;
    returns: TFn extends <T extends readonly any[]>(...args: T) => infer R ? R : never;
    props: OnlyFnProps<TFn>;

};

/**
 * Widens a Function (params, return, and props)
 */
export type WidenFunction<
    /** whether the functioning is a "narrowing function" or not */
    TNarrowing extends boolean,
    /** parameters */
    TParams extends readonly unknown[],
    /** return value */
    TReturn,
    /** key/value props stored at same level as function */
    TProps extends Dictionary,
> = [TNarrowing] extends [true]
    ? AsNarrowingFn<
        WidenFnParams<TParams>,
        DetermineNarrowingReturn<TParams, TReturn>,
        [IsNonEmptyContainer<TProps>] extends [true]
            ? WidenFnProps<TProps, Keys<TProps>>
            : EmptyObject
    >
    : AsLiteralFn<
        WidenFnParams<TParams>,
        Widen<TReturn>,
        [IsNonEmptyContainer<TProps>] extends [true]
            ? WidenFnProps<TProps, Keys<TProps>>
            : EmptyObject
    >;

export type WidenContainer<
    T extends Container,
    TForce extends boolean = false,
>
  = [TForce] extends [true]
      ? T extends readonly unknown[] ? readonly unknown[]
          : T extends Map<unknown, unknown> ? Map<unknown, unknown>
              : T extends Set<unknown> ? Set<unknown>
                  : T extends WeakMap<object, unknown> ? WeakMap<object, unknown>
                      : T extends Dictionary ? Dictionary
                          : never
      : T extends AnyFunction
          ? T extends TypedFunction
              ? WidenFunction<
                  IsNarrowingFn<T>,
                  Parameters<T>,
                  ReturnType<T>,
                  ExpandDictionary<FnKeyValue<T>>
              >
              : Function
          : T extends readonly unknown[] ? WidenTuple<T>
              : T extends Dictionary
                  ? [IsObjectLiteral<T>] extends [true]
                      ? Keys<T> extends readonly (keyof T)[]
                          ? Mutable<ExpandRecursively<WidenObj<T, Keys<T>>>>
                          : never
                      : EmptyObject
                  : T extends Map<infer K, infer V> ? Map<Widen<K>, Widen<V>>
                      : T extends WeakMap<infer O, infer V>
                          ? WeakMap<O, Widen<V>>
                          : T extends Set<infer V>
                              ? Set<Widen<V>>
                              : object;

/**
 * **Widen**`<T, [TForce]>`
 *
 * Converts a literal type to a _wider_ type.
 *
 * - for _scalar values_ `T` will just become wide variant (e.g., `5` → `number`)
 * - for _union types_ all elements of the union will be made wide
 * - for _container values_ it will widen the items inside the container
 *
 * **Note:** should you want the container values to be fully widened you
 * can set `TForce` to true.
 */
export type Widen<
    T,
    TForce extends boolean = false,
> = [IsUnion<T>] extends [true]
    ? WidenUnion<T>
    : T extends Container
        ? WidenContainer<T, TForce>
        : T extends Scalar
            ? WidenScalar<T>
            : Process<T>;
