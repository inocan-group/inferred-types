import type {
    AnyObject,
    If,
    IsTrue,
    Narrowable,
    ObjectKey,
    TypedFunction,
} from "inferred-types/types";
import { isTrue } from "inferred-types/runtime";

/**
 * **createFnWithProps**`(fn, props)`
 *
 * Creates a strongly typed function along with properties.
 *
 * **Note:** since the runtime is trying it's hardest to extract
 * narrow types, it will sometimes reject types it ideally wouldn't.
 * In these cases you may want to consider using `createFnWithPropsExplicit`
 * instead.
 */
export function createFnWithProps<
    TArgs extends readonly unknown[],
    TReturn extends Narrowable,
    N extends Narrowable,
    TProps extends Record<ObjectKey, N>,
    TNarrowing extends boolean = false,
>(fn: (...args: TArgs) => TReturn, props: TProps, narrowing: TNarrowing = false as TNarrowing) {
    const fnWithProps: any = fn;
    for (const prop of Object.keys(props)) {
        fnWithProps[prop] = props[prop];
    }

    return (
        isTrue(narrowing)
            ? fnWithProps as (<A extends Readonly<TArgs>>(...args: A) => TReturn) & TProps
            : fnWithProps as ((...args: TArgs) => TReturn) & TProps
    ) as If<
        IsTrue<TNarrowing>,
    (<A extends TArgs>(...args: A) => TReturn) & TProps,
    ((...args: TArgs) => TReturn) & TProps
    >;
}

/**
 * **createFnWithPropsExplicit**`<F,P>(fn, props)`
 *
 * Creates a strongly typed function along with properties.
 *
 * - unlike the similar `createFnWithProps()`, this utility just
 * expects you to type the function and properties yourself.
 */
export function createFnWithPropsExplicit<
    TFn extends TypedFunction,
    TProps extends AnyObject,
>(fn: TFn, props: TProps) {
    const fnWithProps: any = fn;
    for (const prop of Object.keys(props)) {
        fnWithProps[prop] = props[prop as keyof typeof props];
    }

    return fnWithProps as TFn & TProps;
}
