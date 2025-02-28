import type {
    AnyFunction,
    Dictionary,
    IsNarrowingFn,
    IsNonEmptyObject,
} from "inferred-types/types";

/**
 * **FnMeta**<TArgs,TReturn,TProps>
 *
 * The meta-information around a given function. Represented as an
 * object with the following properties:
 *
 * 1. `args` - the array of arguments the function expects
 * 2. `returns` - the return type of the function
 * 3. `props` - any Key/Value props also packaged with the function, if no
 * key/values are found it will be set to `no-props`.
 */
export interface FnMeta<
    TFn extends AnyFunction = AnyFunction,
    TArgs extends readonly any[] = readonly any[],
    TReturn = unknown,
    TProps extends Dictionary = Dictionary,
> {
    fn: TFn;
    args: TArgs;
    returns: TReturn;
    props: TProps;
    hasProps: [IsNonEmptyObject<TProps>] extends [true] ? true : false;
    hasArgs: TArgs["length"] extends 0 ? false : true;
    isNarrowingFn: IsNarrowingFn<TFn>;
}
