import type {
    ExpandRecursively,
    FnWithProps,
    ObjectKey,
    TypedFunction,
    FnKeyValue,
    WithoutKeys,
    Dictionary,
    IsStaticFn,
} from "inferred-types/types";
import { fnProps } from "runtime/functions";

/**
 * **createFnWithProps**`(fn, props)`
 *
 * Creates a strongly typed function along with key/value properties.
 */
// Overloads to improve literal return inference for function expressions
// Helper type: build return type using captured params/return and merge props
type MergeFnWithProps<
    TOrig extends TypedFunction,
    TProps extends Record<ObjectKey, unknown>,
    TParams extends readonly any[],
    TReturn,
> = FnKeyValue<TOrig> extends infer P extends Dictionary
    ? [keyof P] extends [never]
        ? ((...args: TParams) => TReturn) & ExpandRecursively<TProps>
        : ((...args: TParams) => TReturn) & Readonly<
            ExpandRecursively<
                WithoutKeys<P, Extract<keyof TProps, ObjectKey>> & TProps
            >
        >
    : ((...args: TParams) => TReturn) & ExpandRecursively<TProps>;

// Unified overload: function expression (with or without existing props)
export function createFnWithProps<
    const TParams extends readonly any[],
    const TReturn,
    const TProps extends Record<ObjectKey, unknown>,
    const TOrig extends TypedFunction = (...args: TParams) => TReturn,
>(
    fn: IsStaticFn<TOrig> extends true
        ? ((...args: TParams) => TReturn) & TOrig
        : never,
    props: TProps,
    _narrowing?: false | boolean
): ExpandRecursively<MergeFnWithProps<TOrig, TProps, TParams, TReturn>>;
export function createFnWithProps<
    const TFn extends TypedFunction,
    const TProps extends Record<ObjectKey, unknown>,
    const TNarrowing extends boolean = false,
>(
    fn: TFn,
    props: TProps,
    _narrowing?: TNarrowing
): ExpandRecursively<FnWithProps<TFn, TProps>>;
export function createFnWithProps<
    const TFn extends TypedFunction,
    const TProps extends Record<ObjectKey, unknown>,
    const TNarrowing extends boolean = false,
>(
    fn: TFn,
    props: TProps,
    _narrowing: TNarrowing = false as TNarrowing
) {
    let fnWithProps: any = fn;
    const p = {
        ...(fnProps(fn)),
        ...props
    };
    for (const prop of Object.keys(p)) {
        if (prop !== "name") {
            fnWithProps[prop] = p[prop];
        }
    }

    if ("name" in props) {
        fnWithProps = Object.defineProperties(fnWithProps, {
            name: {
                value: p.name,
                writable: false
            }
        });
    }

    return fnWithProps as unknown as ExpandRecursively<
        FnWithProps<TFn, TProps>
    >;
}
