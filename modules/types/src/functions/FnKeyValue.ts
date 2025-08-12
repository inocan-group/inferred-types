import type {
    AnyFunction,
    As,
    Dictionary,
    EmptyObject,
    Err,
    IsEqual,
    ObjectKey,
    TypedFunction,
} from "inferred-types/types";

type Process<
    T extends AnyFunction,
> = keyof T extends ObjectKey
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
> = As<
Function extends T
? EmptyObject
: T extends TypedFunction
    ? Process<T>
: Err<`invalid-fn`, `the type passed into 'FnKeyValue<T>' appears not to be a function!`>,

Dictionary | Error>;

