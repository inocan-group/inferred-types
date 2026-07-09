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
    FnMeta,
    FnReturn,
    IsLiteralLike,
    IsNarrowingFn,
    IsNonEmptyContainer,
    IsReadonlyArray,
    IsUnion,
    IsWideArray,
    Keys,
    LongestCommonPrefix,
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
        : T extends bigint
          ? bigint
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
          ? WidenFunc<T>
          : AnyFunction
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
    ? WidenDictionary<T, Rest, TResults & Record<Head, Widen<T[Head]>>>
    : ExpandRecursively<TResults>;

export type WidenTuple<T extends readonly unknown[]> = {
    [K in keyof T]: IsLiteralLike<T[K]> extends true
        ? WidenLiteral<T[K]>
        : Process<T[K]>;
};

/**
 * **WidenUnion**<T>
 *
 * Widens all the elements in the union type.
 */
export type WidenUnion<T> = WidenTuple<UnionToTuple<T>>[number];

export type WidenLiteral<T> = T extends Scalar
    ? WidenScalar<T>
    : IsUnion<T> extends true
      ? WidenUnion<T>
      : T extends readonly unknown[]
        ? WidenTuple<T>
        : T extends Dictionary
          ? WidenDictionary<T, StringKeys<T>>
          : never;

/**
 * Widens each element of a _fixed-length_ tuple, accumulating into `R`.
 *
 * The recursion peels elements with a **readonly** head/rest pattern so it
 * matches both mutable and `readonly` tuples (a mutable-only pattern would
 * fail to match a `readonly` tuple and collapse the result to `[]`).
 */
type WidenArrayInner<
    T extends readonly unknown[],
    R extends readonly unknown[] = [],
> = T extends readonly [infer Head, ...infer Rest]
    ? WidenArrayInner<Rest, [...R, Widen<Head>]>
    : R;

/**
 * Widens the elements of an array/tuple `T` by one level while preserving its
 * structure. _Wide_ (variadic-length) arrays pass through untouched; a
 * fixed-length tuple has each element widened and its `readonly` modifier
 * re-applied so that, e.g., `readonly [string, 1 | 2 | 3]` widens to
 * `readonly [string, number]` (not the narrower mutable form).
 */
type WidenArray<T extends readonly unknown[]> = number extends T["length"]
    ? T
    : [IsReadonlyArray<T>] extends [true]
        ? readonly [...WidenArrayInner<T>]
        : WidenArrayInner<T>;

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
              ? TResult &
                    Record<
                        First<TKeys>,
                        TObj[First<TKeys>] extends Scalar
                            ? WidenScalar<TObj[First<TKeys>]>
                            : TObj[First<TKeys>]
                    >
              : TResult
      >;

/**
 * Widens the parameter tuple of a function.
 *
 * Delegates to `WidenArray`, which already passes _wide_ tuples through
 * untouched and otherwise widens each parameter via `Widen`.
 */
type WidenFunctionParams<TParams extends readonly unknown[]> =
    WidenArray<TParams>;

/**
 * Widens a function's return type.
 *
 * A function's return is frequently a _scalar_ (or a scalar union) and is
 * often supplied via the built-in `ReturnType<Fn>`. For a **generic**
 * function that produces a lazy template-literal union (e.g. the return of
 * `<T extends "Bob" | "Nancy">(name: T) => `hi ${T}``, i.e.
 * `` `hi ${"Bob" | "Nancy"}` ``), routing straight through `Widen` forces the
 * expensive `UnionToTuple` materialization and can blow past TypeScript's
 * instantiation limits.
 *
 * To stay cheap we first test scalar assignability with a **non-distributive**
 * `[TReturn] extends [...]` check — this widens the common scalar cases
 * without ever materializing the union — and only fall back to the full
 * `Widen` for genuinely structural returns (objects, tuples, mixed unions).
 */
type WidenFunctionReturn<TReturn> = [TReturn] extends [string]
    ? string
    : [TReturn] extends [number]
      ? number
      : [TReturn] extends [boolean]
        ? boolean
        : [TReturn] extends [bigint]
          ? bigint
          : [TReturn] extends [symbol]
            ? symbol
            : [TReturn] extends [null]
              ? null
              : [TReturn] extends [undefined]
                ? undefined
                : Widen<TReturn>;

/**
 * Widens the intersection props stored alongside a function, collapsing
 * to `EmptyObject` when there are none.
 */
type WidenFunctionProps<TProps extends Dictionary> = [
    IsNonEmptyContainer<TProps>,
] extends [true]
    ? WidenFnProps<TProps, Keys<TProps>>
    : EmptyObject;

export interface WidenFn<TFn extends TypedFunction> {
    narrowing: IsNarrowingFn<TFn>;
    literal: StaticFn<TFn>;
    parameters: Parameters<TFn>;
    returns: TFn extends <T extends readonly any[]>(...args: T) => infer R
        ? R
        : never;
    props: FnKeyValue<TFn>;
}

/**
 * Recovers a function's return type **without** the `any`-collapse that the
 * built-in `ReturnType` suffers for a _union_-constrained generic whose type
 * parameter is woven into a template literal (e.g.
 * `` <T extends "Bob" | "Nancy">(name: T) => `hi ${T}` ``). Re-inferring `R`
 * through a fresh call signature keeps the concrete (often _union_) return.
 */
type RecoverFnReturn<T extends TypedFunction> = T extends {
    (...args: infer _A): infer R;
}
    ? R
    : never;

/**
 * Widens a _recovered_ function return value.
 *
 * For string (or string-union) returns we collapse to the widest template
 * literal that still preserves the shared prefix — e.g.
 * `"hi Bob" | "hi Nancy"` becomes `` `hi ${string}` ``. Non-string returns
 * defer to the ordinary `Widen`.
 */
type WidenFnReturnValue<R> = [R] extends [string]
    ? LongestCommonPrefix<As<R, string>> extends infer TPrefix extends string
        ? [TPrefix] extends [""]
            ? string
            : `${TPrefix}${string}`
        : string
    : Widen<R>;

/**
 * **WidenFunc**`<T>`
 *
 * Widens a function `T` while preserving its _narrowing_ vs _static_ character:
 *
 * - a **narrowing** function keeps its generic input constraint and widens
 *   only its return value; a single-parameter narrowing function is rebuilt
 *   in the ergonomic `` <X extends C>(x: X) => R `` form.
 * - a **static** function widens through `FnFrom`.
 *
 * Unlike the (now deprecated) `WidenFunction`, `WidenFunc` receives the whole
 * function and can therefore _recover_ template-literal returns that
 * `ReturnType` would otherwise collapse to `any`.
 *
 * The widened pieces are computed **once** in the `_Params`/`_Return`/`_Props`
 * helper parameters; hoisting `FnMeta<T>["params"]` into an eager type
 * parameter is also what keeps the rebuilt parameter tuple at the correct
 * _arity_ (passing it lazily lets TypeScript collapse `[P]` to `P[]`).
 */
export type WidenFunc<
    T extends Function,
    _Params extends readonly unknown[] = T extends TypedFunction
        ? FnMeta<T>["params"]
        : [],
    _Return = T extends TypedFunction
        ? WidenFnReturnValue<RecoverFnReturn<T>>
        : never,
    _Props extends Dictionary = T extends TypedFunction
        ? ExpandDictionary<FnKeyValue<T>>
        : EmptyObject,
> = Function extends T
    ? Function
    : T extends TypedFunction
        ? [IsNarrowingFn<T>] extends [true]
            ? _Params extends readonly [infer P0]
                ? [IsNonEmptyContainer<_Props>] extends [true]
                    ? (<X extends P0>(x: X) => _Return) & _Props
                    : <X extends P0>(x: X) => _Return
                : FnFrom<_Params, _Return, _Props>
            : FnFrom<_Params, _Return, _Props>
        : never;

/**
 * **WidenFunction**`<TNarrowing, TParams, TReturn, TProps>`
 *
 * @deprecated Prefer {@link WidenFunc}, which receives the whole function
 * rather than its pre-split constituent parts. Because `WidenFunction` is
 * handed `TReturn` (typically `ReturnType<Fn>`) it cannot recover a
 * template-literal return that TypeScript has already collapsed to `any`
 * (which happens for _union_-constrained generics), so the shared prefix of
 * the return is lost. `WidenFunc` re-infers the return directly from the
 * function and preserves it.
 *
 * Widens a Function from its constituent parts (parameters, return value,
 * and any props hung off the function), producing a _narrowing_ function
 * when `TNarrowing` is `true` and a _static_ function otherwise.
 *
 * The widened pieces are computed **once** via the `_P`/`_R`/`_Props` helper
 * parameters rather than inline in each branch. `TNarrowing` is commonly a
 * _deferred_ boolean (e.g. `IsNarrowingFn<Fn>`), and inlining the widening
 * into both branches makes TypeScript instantiate it twice — needless work
 * that pushes complex signatures toward the instantiation limit.
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
    _P extends readonly unknown[] = WidenFunctionParams<TParams>,
    _R = WidenFunctionReturn<TReturn>,
    _Props extends Dictionary = WidenFunctionProps<TProps>,
> = [TNarrowing] extends [true]
    ? AsNarrowingFn<_P, _R, _Props>
    : AsStaticFn<_P, _R, _Props>;

export type WidenContainer<
    T extends Container,
    TForce extends boolean = false,
> = [T] extends [readonly unknown[]]
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
              : WeakMap<K extends object ? K : any, Widen<V>>
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
export type Widen<T, TForce extends boolean = false> = [IsUnion<T>] extends [
    true,
]
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
