import type {
    AfterFirst,
    AnyObject,
    EmptyObject,
    ExpandDictionary,
    First,
    ObjectKey,
    RequiredKeys,
    TypedFunction,
} from "inferred-types/types";

type ReqKeys<
    K extends readonly (ObjectKey & keyof O)[],
    I extends AnyObject,
    O extends AnyObject,
    R extends AnyObject = EmptyObject,
> = [] extends K
    ? Required<R>
    : ReqKeys<
        AfterFirst<K>,
        I,
        O,
    R & Record<First<K>, O[First<K>] | (<R extends O[First<K>]>(v: I) => R)>
    >;

type OptKeys<
    K extends readonly (ObjectKey & keyof O)[],
    I extends AnyObject,
    O extends AnyObject,
    R extends AnyObject = EmptyObject,
> = [] extends K
    ? Partial<R>
    : ReqKeys<
        AfterFirst<K>,
        I,
        O,
  R & Record<First<K>, O[First<K>] | (<R extends O[First<K>]>(v: I) => R)>
    >;

/**
 * **ObjectMap**`<I,O>`
 *
 * A dictionary who's keys map to the keys of `O` and values extend
 * either:
 *
 * 1. `O[key]`
 * 2. `<TInput extends I>(input: I) => O[key]`
 *
 * This dictionary structure describes a converion from type `I` to
 * type `O` though the eyes of the structure of `O`.
 *
 * **Related**: `ObjectMapConversion`
 */
export type ObjectMap<
    I extends AnyObject,
    O extends AnyObject,
> = (i: I) => ExpandDictionary<
    ReqKeys<RequiredKeys<O>, I, O> &
    OptKeys<RequiredKeys<O>, I, O>
>;

export type ObjectMapConversion<
    I extends AnyObject,
    O extends AnyObject,
    M extends ObjectMap<I, O>,
> = <TInput extends I>(input: TInput) => {
    [K in keyof M]: K extends keyof O
        ? M[K] extends TypedFunction
            ? ReturnType<M[K]>
            : M[K]
        : never
};

export type ObjectMapper<
    I extends AnyObject,
    O extends AnyObject,
> = <T extends I>(input: T) => {
    [K in keyof O]: O[K]
};

export type ObjectMapperCallback<
    I extends AnyObject,
    O extends AnyObject,
> = ((cb: ObjectMapper<I, O>) => unknown);
