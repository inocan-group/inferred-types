import type {
    AfterFirst,
    AnyFunction,
    AnyMap,
    AnySet,
    AnyWeakMap,
    As,
    AsNarrowingFn,
    AsStaticFn,
    Container,
    Dictionary,
    EmptyObject,
    ExpandDictionary,
    ExpandRecursively,
    First,
    FnFrom,
    FnKeyValue,
    FnReturn,
    IsLiteralLike,
    IsLiteralUnion,
    IsNarrowingFn,
    IsNonEmptyContainer,
    IsUnion,
    IsWideArray,
    Keys,
    ObjectKey,
    ObjectKeys,
    Scalar,
    StaticFn,
    StringKeys,
    TypedFunction,
    UnionToTuple,
} from "inferred-types/types";


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
                ? WidenDictionary<T, StringKeys<T>>
                : T;

type WidenDictionary<
    T extends Dictionary,
    K extends readonly ObjectKey[] = As<ObjectKeys<T>, readonly ObjectKey[]>,
    TResults extends Dictionary = EmptyObject,
> = K extends [infer Head extends ObjectKey, ...infer Rest extends ObjectKey[]]
    ? WidenDictionary<
        T,
        Rest,
    TResults & Record<Head, Widen<T[Head]>>
    >
    : ExpandRecursively<TResults>;

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
                ? WidenDictionary<T, StringKeys<T>>
                : never;

type WidenArray<
    T extends readonly unknown[],
    R extends readonly unknown[] = []
> = number extends T["length"]
    ? T
    : T extends [infer Head, ...infer Rest]
        ? WidenArray<
            Rest,
            [...R, Widen<Head>]
        >
        : R;

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

export type WidenFn<
    TFn extends TypedFunction
> = {
    narrowing: IsNarrowingFn<TFn>;
    literal: StaticFn<TFn>;
    parameters: Parameters<TFn>;
    returns: TFn extends <T extends readonly any[]>(...args: T) => infer R ? R : never;
    props: FnKeyValue<TFn>;

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
    : AsStaticFn<
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
= [T] extends [readonly unknown[]]
    ? TForce extends true
        ? readonly unknown[]
        : WidenArray<T>
    : [T] extends [Dictionary]
        ? TForce extends true
            ? Dictionary
            : WidenDictionary<T>
        : [T] extends [Map<infer K, infer V>]
            ? TForce extends true
                ? AnyMap
                : Map<K, Widen<V>>
            : [T] extends [WeakMap<infer K, infer V>]
                ? TForce extends true
                    ? AnyWeakMap
                    : WeakMap<
                        K extends object ? K : any,
                        Widen<V>
                    >
                : [T] extends [Set<infer V>]
                    ? TForce extends true
                        ? AnySet
                        : Set<Widen<V>>
                    : T;

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
>
= [IsUnion<T>] extends [true]
    ? WidenUnion<T>
    : [T] extends [TypedFunction]
        ? FnFrom<
            IsWideArray<Parameters<T>> extends true
                ? Parameters<T>
                : WidenArray<Parameters<T>>,
            Widen<FnReturn<T>>,
            WidenDictionary<FnKeyValue<T>>
        >
        : [T] extends [Scalar]
            ? WidenScalar<T>
            : [T] extends [Container]
                ? WidenContainer<T, TForce>
                : T extends Scalar
                    ? WidenScalar<T>
                    : Process<T>;
