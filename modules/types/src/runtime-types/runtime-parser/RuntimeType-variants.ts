import {
    Narrowable,
    BaseRuntimeType,
    ObjectKey, TypedFunction, TypedFunctionWithDictionary,
    FnKeyValue
} from "inferred-types/types";

type Atomic = null | undefined | true | false | boolean | symbol;
type Literal = string | number;
type Kv = Record<ObjectKey, Narrowable> | Map<Narrowable, Narrowable> | WeakMap<Narrowable & object, Narrowable>;
type RuntimeSet = Set<Narrowable>;
type Fn =TypedFunction<Narrowable[],any>
        | TypedFunctionWithDictionary<
            Narrowable[],
            any,
            Record<ObjectKey, Narrowable>
        >;

type RuntimeGenerator = Generator<unknown,any,any>;


/**
 * an _atomic_ variant of `RuntimeType<T,U>`
 */
export type RuntimeType__Atomic<
    T extends string,
    U extends Atomic
> = {
    readonly kind: "atomic";
    readonly token: T;
    readonly type: U;
} & BaseRuntimeType<T,U>;


/**
 * a _literal_ variant of `RuntimeType<T,U>`
 */
export type RuntimeType__Literal<
    T extends string,
    U extends Literal
> = {
    readonly kind: "literal";
    readonly token: T;
    readonly type: U;
} & BaseRuntimeType<T,U>;


/**
 * a _kv_ variant of `RuntimeType<T,U>`
 */
export type RuntimeType__Kv<
    T extends string,
    U extends Kv
> = {
    readonly kind: "kv";
    readonly token: T;
    readonly type: U;
} & BaseRuntimeType<T,U>;

/**
 * a _set_ variant of `RuntimeType<T,U>`
 */
export type RuntimeType__Set<
    T extends string,
    U extends RuntimeSet
> = {
    readonly kind: "set";
    readonly token: T;
    readonly type: U;
} & BaseRuntimeType<T,U>;

/**
 * a _function_ variant of `RuntimeType<T,U>`
 */
export type RuntimeType__Function<
    T extends string,
    U extends Fn
> = {
    readonly kind: "function";
    readonly token: T;
    readonly keyValue?: FnKeyValue<U>;
    readonly params: Parameters<U>;
    readonly returns: ReturnType<U>;
    readonly type: U;
} & BaseRuntimeType<T,U>;

/**
 * a _generator_ variant of `RuntimeType<T,U>`
 */
export type RuntimeType__Generator<
    T extends string,
    U extends RuntimeGenerator
> = {
    readonly kind: "generator";
    readonly token: T;
    readonly type: U;
} & BaseRuntimeType<T,U>;



/**
 * **RuntimeType**`<T,U>`
 *
 * An key/value object built for the runtime by the `parseInputToken()`
 * parser.
 *
 * - the _token_ is found on the `.token` property
 * - the _representative_ type on the `.type` property
 * - an `extends()` type-guard which will type check a value to see if
 * it _extends_ the type this token represents.
 *
 * ### Generics
 *
 * - the `T` generic represents the "token"
 * - the `U` generic represents the represented **type**
 */
export type RuntimeType<
    T extends string = string,
    U = any,
> = U extends Atomic
? RuntimeType__Atomic<T,U>
: U extends Literal
? RuntimeType__Literal<T,U>
: U extends Kv
? RuntimeType__Kv<T,U>
: U extends RuntimeSet
? RuntimeType__Set<T,U>
: U extends Fn
? RuntimeType__Function<T,U>
: U extends RuntimeGenerator
? RuntimeType__Generator<T,U>
: never;

