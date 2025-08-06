import type {
    FnKeyValue,
    StaticFn,
    MergeObjects,
    Narrowable,
    ObjectKey,
    TypedFunction,
    FnReturn,
} from "inferred-types/types";
import { fnProps } from "runtime/functions";

type FnWithProps<
    TFn extends TypedFunction,
    TProps extends Record<ObjectKey, Narrowable>,
    TNarrowing extends boolean,
    Fn extends <A extends Parameters<TFn>>(...args: A) => FnReturn<TFn> = <A extends Parameters<TFn>>(...args: A) => FnReturn<TFn>
> = TNarrowing extends true
    ? Fn & MergeObjects<FnKeyValue<TFn>, TProps>
    : StaticFn<Fn> & MergeObjects<FnKeyValue<TFn>, TProps>;

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
    const TProps extends Record<ObjectKey, N>,
    N extends Narrowable,
    const TFn extends TypedFunction,
    TNarrowing extends boolean = false,
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

    return fnWithProps as unknown as FnWithProps<
        TFn,
        TProps,
        TNarrowing
    >;
}
