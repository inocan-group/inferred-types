import type {
    AnyFunction,
    Dictionary,
    EmptyObject,
    IsEqual,
    ObjectKey,
    TypedFunction,
} from "inferred-types/types";

type Process<
    T extends AnyFunction,
> = IsEqual<T, Function> extends true
    ? EmptyObject
    : keyof T extends ObjectKey
        ? Pick<T, keyof T>
        : never;

/**
 * **FnKeyValue**`<T>`
 *
 * Return a dictionary of key/value pairs from a function. If no key/value
 * pairs are assigned to the function base then an empty object is returned.
 */
export type FnKeyValue<
    T extends AnyFunction,
> = Function extends T
? Dictionary
: T extends TypedFunction
    ? Process<T>
: never
    ;
