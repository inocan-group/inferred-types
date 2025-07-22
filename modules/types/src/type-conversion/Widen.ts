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
    IsEqual,
    IsLiteral,
    IsLiteralUnion,
    IsNarrowingFn,
    IsNonEmptyContainer,
    IsObjectLiteral,
    IsUnion,
    Keys,
    Mutable,
    ObjectKey,
    RemoveFnProps,
    Scalar,
    StringKeys,
    TypedFunction,
    UnionToTuple,
} from "inferred-types/types";

type GetKeys<
    T extends AnyFunction,
> = FnKeyValue<T> extends Dictionary
    ? Keys<FnKeyValue<T>> extends readonly ObjectKey[]
        ? Keys<FnKeyValue<T>> extends readonly (keyof FnKeyValue<T>)[]
            ? Keys<FnKeyValue<T>>
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
    : T extends unknown[]
        ? T extends (infer Type)[]
            ? IsUnion<Type> extends true
                ? WidenUnion<Type>[]
                : Type extends unknown[] ? WidenTuple<Type> : T
            : never
        : T extends AnyFunction
            ? GetKeys<T>["length"] extends 0
                ? RemoveFnProps<T>
                : RemoveFnProps<T> & ExpandRecursively<WidenObj<FnKeyValue<T>, GetKeys<T>>>
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
            T[First<TKeys>] extends TypedFunction
                ? WidenFn<
                    IsNarrowingFn<T[First<TKeys>]>,
                    Parameters<T[First<TKeys>]>,
                    ReturnType<T[First<TKeys>]>,
                    ExpandDictionary<FnKeyValue<T[First<TKeys>]>>
                >
                : IsLiteral<T[First<TKeys>]> extends true
                    ? WidenLiteral<T[First<TKeys>]>
                    : Process<T[First<TKeys>]>
        >
    >;

export type WidenTuple<
    T extends readonly unknown[],
> = {
    [K in keyof T]: IsLiteral<T[K]> extends true
        ? WidenLiteral<T[K]>
        : Process<T[K]>
};

type WidenFnParams<
    T extends readonly unknown[],
> = {
    [K in keyof T]: IsLiteral<T[K]> extends true
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

type WidenFn<
    TNarrowing extends boolean,
    TParams extends readonly unknown[],
    TReturn,
    TProps extends Dictionary,
> = [TNarrowing] extends [true]
    ? AsNarrowingFn<
        WidenFnParams<TParams>,
        IsEqual<TReturn, any> extends true
            ? unknown
            : Widen<TReturn>,
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
              ? WidenFn<
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
